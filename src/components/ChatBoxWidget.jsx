import React, { useState,Fragment } from "react";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const ChatboxWidget = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [firstMessage, setFirstMessage] = useState(null);
  let ranFirst = false;

  async function queryWithRetry(index, queryParams, retries = 0) {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second
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

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { sender:"user", text: message, role: "user", content: message },
      { sender: "bot", text: "", role: "assistant", content: "" },
    ]);

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

    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index("ragforcars").namespace("car-data");
    const openai = new OpenAI();

    data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    };

    data = data.json();

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
  } catch (error) {
    console.error("Error querying Pinecone:", error);
  }

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      return reader.read().then(async function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });

        if (!ranFirst) {
          // console.log("I AM RUNNING INIHIHIHol")
          // console.log(text)
          let string = text.substring(0, text.lastIndexOf("}")+1)
          //Right here, we have to figure out if the professors are saved in the firebase
          console.log("I AM THIS STRING:")
          console.log(string)
          let lis = [];
          console.log(text)
          ranFirst = true;
          
          setFirstMessage(JSON.parse(string));
          console.log(JSON.parse(string));
          let stri = text.substring(text.lastIndexOf("}")+1, text.length)
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + stri },
            ];
          });
        } else {
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + text },
            ];
          });
        }

        return reader.read().then(processText);
      });
    });
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { sender: "user", text: userInput }];
      setMessages(newMessages);
      setUserInput("");

      // Simulate bot response (replace this with your backend logic)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `You said: "${userInput}"` },
        ]);
      }, 500);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatboxToggle} onClick={toggleChatbox}>
        {isOpen ? "Close Chat" : "Chat with us"}
      </div>
      {isOpen && (
        <div style={styles.chatbox}>
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#007bff" : "#e9ecef",
                  color: msg.sender === "user" ? "#fff" : "#000",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button style={styles.sendButton} onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
  chatboxToggle: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "20px",
    cursor: "pointer",
    textAlign: "center",
  },
  chatbox: {
    width: "300px",
    height: "400px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  messages: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
  },
  message: {
    padding: "10px",
    borderRadius: "15px",
    maxWidth: "70%",
    wordWrap: "break-word",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ccc",
    padding: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "15px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  sendButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "15px",
    cursor: "pointer",
  },
};

export default ChatboxWidget;