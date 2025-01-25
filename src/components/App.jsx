import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Carousel from "./Carousel";
import Footer from "./Footer";




function App(){
    return (
        <div>
            <Navbar />
            <Hero />
            <Features /> 
            <Carousel />                     
            <Footer />
        </div>
    )
};

export default App;