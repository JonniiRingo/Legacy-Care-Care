import React, { useState } from "react";

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

export default ChatboxWidget;