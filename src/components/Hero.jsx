import React from "react";

function Hero(){
    return(
        <div className="px-4 pt-5 my-5 text-center ">
            <h1 className="display-4 fw-bold text-body-emphasis">Drive with Pride</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">
                    Welcome to Legacy Car Care, where we treat your car as if it was our own. With over 20 years of passion for classic cars and a dedication to excellence, we deliver top-tier car care services that’ll leave your ride shining like new. Whether it’s a Sunday cruiser or your daily workhorse, we’ve got you covered.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">Create An Account</button>
                    <button type="button" className="btn btn-outline-secondary btn-lg px-4">Log In </button>
                </div>
            </div>
            <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
                <div className="container px-5" style={{ maxHeight: 'none', overflow: 'visible' }}></div>
                <img src="/assets/images/hero%202.png" alt="hero image" style={{ maxHeight: 'none', overflow: 'visible' }}/>
            </div>
        </div>    
    )
};

export default Hero;