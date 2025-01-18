import React from "react";


function Hero(){
    return(
        <div class="px-4 pt-5 my-5 text-center ">
        <h1 class="display-4 fw-bold text-body-emphasis">Drive with Pride</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            Welcome to Legacy Car Care, where we treat your car as if it was our own. With over 20 years of passion for classic cars and a dedication to excellence, we deliver top-tier car care services that’ll leave your ride shining like new. Whether it’s a Sunday cruiser or your daily workhorse, we’ve got you covered.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Primary button</button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
          </div>
        </div>
        <div class="overflow-hidden" style="max-height: 30vh;">
          <div class="container px-5" style="max-height: none; overflow: visible;"></div>
            <img src="./assets/images/hero 2.png" alt="hero image" style="max-height: none; overflow: visible;"/>
        </div>
      </div>    
    )
};

export default Navbar; 