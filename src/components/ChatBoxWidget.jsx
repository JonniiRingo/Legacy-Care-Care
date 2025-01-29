import React, { useState,Fragment } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";

const ChatboxWidget = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button style={styles.sendButton} onClick={handleSend}>
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

function ChatBotTemp() {

  const [messagesT, setmessagesT] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Car Department Bot. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState("");
  const [firstMessage, setFirstMessage] = useState(null);
  let ranFirst = false;

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessage("");
    setmessagesT((messagesT) => [
      ...messagesT,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messagesT, { role: "user", content: message }]),
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
          setmessagesT((messagesT) => {
            let lastMessage = messagesT[messagesT.length - 1];
            let othermessagesT = messagesT.slice(0, messagesT.length - 1);
            return [
              ...othermessagesT,
              { ...lastMessage, content: lastMessage.content + stri },
            ];
          });
        } else {
          setmessagesT((messagesT) => {
            let lastMessage = messagesT[messagesT.length - 1];
            let othermessagesT = messagesT.slice(0, messagesT.length - 1);
            return [
              ...othermessagesT,
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
            
            {messagesT.map((message, index) => (
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

export default ChatBotTemp;
export { ChatboxWidget };