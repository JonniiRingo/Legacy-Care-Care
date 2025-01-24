import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import { useRouter } from 'next/navigation'
// import {Widget} from "./react-chat-widget"


// Methods for the widget 
// import 'react-chat-widget/lib/styles.css';

// function App() {
//   const handleNewUserMessage = (newMessage) => {
//     console.log(`New message incoming! ${newMessage}`);
//     // Now send the message throught the backend API
//   };




function App(){
    const router = useRouter()
    return (
        <div>
            <Navbar />
            <Hero />
            <Features /> 
            {/* <Widget /> */}
            <Footer />
        </div>
    )
};

export default App;