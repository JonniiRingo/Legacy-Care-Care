import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

// CAN CHANGE THE SYSTEM PROMPT IF NEEDED TO GET A BETTER RESULT

const systemPrompt = `
You are Legacy Car Care's Virtual Assistant, an intelligent chatbot designed to help users with car care service inquiries. Your role is to understand user intent, provide tailored service recommendations, and deliver clear, helpful responses.

Instructions for Behavior:
Understand User Intent:

Use natural language processing (NLP) to interpret user requests.
Identify key parameters:
Car Type: E.g., sedan, truck, classic car.
Service Package: E.g., "Sedan Shine," "Deluxe Wax."
Additional Options: E.g., waxing, clay bar treatment, tire shine.
Query the Database:

Map user requests to database entries based on:
Car type.
Service package.
Optional features.
Fetch pricing, service duration, and package details.
Calculate and Present Estimates:

Provide a detailed estimate including:
Base price for the selected package.
Additional costs for optional features.
Total estimated service duration.
Format responses like:
"The 'Deluxe Wax' package for your classic car costs $85 and takes approximately 2 hours. Would you like to proceed?"
Handle Edge Cases:

If user input is ambiguous or incomplete:
Suggest clarifications: "Did you mean a sedan or a classic car?"
Offer default options or escalate to a human assistant if needed.
Recommend Upgrades:

Analyze user preferences for potential package upgrades or additional services.
Suggest premium options:
"Would you like to add a tire shine to your package for an additional $10?"
Maintain Friendly, Professional Tone:

Ensure responses are polite, concise, and user-friendly.
Anticipate user questions and provide helpful follow-ups.
Example Workflow:
User Input: "I have a classic car. Can I get a wax job?"
Response:
"We recommend the 'Classic Shine' package for your classic car, which includes waxing and detailing for $120. It will take approximately 2.5 hours. Would you like to proceed?"
`;

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function queryWithRetry(index, queryParams, retries = 0) {
  try {
    const results = await index.query(queryParams);
    return results;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(
        `Query failed. Retrying in ${RETRY_DELAY}ms... (Attempt ${
          retries + 1
        }/${MAX_RETRIES})`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return queryWithRetry(index, queryParams, retries + 1);
    } else {
      console.error("Max retries reached. Query failed:", error);
      throw error;
    }
  }
}

// Takes user query, combines it with a vector search in Pinecone, and makes the query to OpenAI
// Provides context-aware responses
export async function POST(req) {
  console.log("HEYOOOO")
  console.log("Request body:", req.body);
  const data = await req.json();

  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.index("ragforcars").namespace("car-data");
  const openai = new OpenAI();

  // create embedding for the user's question
  const text = data[data.length - 1].content;
  console.log("User query:", text);
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
  });

  try {
    const results = await queryWithRetry(index, {
      topK: 5,
      includeMetadata: true,
      vector: embedding.data[0].embedding,
    });
    // console.log("Pinecone results:", results);

    // Process the Pinecone results into a readable string
    let jsonArr = [];
    let resultString = "";
    results.matches.forEach((match) => {
      console.log("SCORE")
      console.log(match["score"])
      const meta1 = match.metadata;
      console.log("HEY")
      console.log(meta1)
      if (match["score"] >= 0.55){
        if(match.metadata.MAKE === "Unsure"){
          resultString += `Sorry, no results found.`
        }
        else{
          const meta = match.metadata;
          console.log("HEY")
          console.log(meta)

          jsonArr.push(meta);
          resultString += `
            Returned Results:
            Car Type: ${meta.Car_Type}
            Package Name: ${meta.Package_Name}
            Pricing (USD): ${meta.Pricing_USD}
            Estimated Service Duration Minutes: ${meta.Estimated_Service_Duration_Minutes}
            \n`;
        }
      }
    });
    if (resultString === "") {
      resultString = "No results found.";
    }

    console.log("Result string:" + resultString);

    // Combine user's question with Pinecone results
    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

    // Create chat completion request to OpenAI with the systemPrompt and the combined user query
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...lastDataWithoutLastMessage,
        { role: "user", content: lastMessageContent },
      ],
      model: "gpt-3.5-turbo",
      stream: true,
    });

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          const jsonText = encoder.encode(JSON.stringify({ data: jsonArr }));
          controller.enqueue(jsonText);
          controller.enqueue(" ")

          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {
    // Handle the error after all retries have failed
    console.error("Query failed after all retries:", error);
    return new NextResponse(500);
  }
}