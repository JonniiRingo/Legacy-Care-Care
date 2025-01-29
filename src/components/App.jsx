import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import ChatboxWidget from "./ChatBoxWidget";
import Carousel from "./Carousel";
import Footer from "./Footer";
import ChatBotTemp from "./ChatBotTemp";




function App(){
    return (
        <div>
            <Navbar />
            <Hero />
            <Features /> 
            <ChatboxWidget />
            <Carousel /> 
            <ChatBotTemp />                    
            <Footer />
        </div>
    )
};

export default App;