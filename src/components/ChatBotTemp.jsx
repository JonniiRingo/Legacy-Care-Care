'use client'
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState, Fragment } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function ChatBotTemp() {

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Car Department Bot. How can I help you today?`,
    },
  ]);
  // const { isLoaded, isSignedIn, user } = useUser()
  const [message, setMessage] = useState("");
  const [firstMessage, setFirstMessage] = useState(null);
  let ranFirst = false;

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

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


  return (
    <Box>
      {/* <NavBar /> */}
      <Box
        min-width="100vw"
        min-height="100vh"
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        paddingTop={10}
        
      >
        <Stack
          className="moving-background-chatbot"
          direction={"column"}
          width="500px"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
        >
          <Stack
            direction={"column"}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
              >
                
                <Box
                  bgcolor={
                    message.role === "assistant"
                      ? "primary.main"
                      : "secondary.main"
                  }
                  color="white"
                  borderRadius={10}
                  p={3}
                >
                  {message.content.split("\n").map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <TextField
              sx={
                {
                  backgroundColor: "white!important",
                  borderRadius: "5px"
                }
              }
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" 
                onClick={sendMessage}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default ChatBotTemp();