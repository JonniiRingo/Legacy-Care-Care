import React from "react"; 



function Features(){
    return (
        <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Columns with icons</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <img src="./briefcase.svg" alt="briefcase" height={30}/>
              
            </div>
            <h3 className="fs-2 text-body-emphasis">Passion for Classics</h3>
            <p>
              At Legacy Car Care, we specialize in restoring the shine and elegance of classic cars. Every wash is done with precision, care, and the love your car deserves. Trust us to treat your legacy with the respect it commands.
            </p>
            <a href="#" className="icon-link">
              Get Your Car Washed
              <img src="./chevron-right.svg" alt="chevron-right"/>
            </a>
          </div>
    
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <img src="./chat-square-heart.svg" alt="chat-square-heart" height={30}/>
            </div>
            <h3 className="fs-2 text-body-emphasis">World-Class Service</h3>
            <p>
              Born and raised in El Camino, we bring local pride and a community-driven work ethic to every car we touch. Our team knows what it means to hustle, and we’re here to make your ride look its absolute best.
            </p>
            <a href="#" class="icon-link">
              Contact Us Today
              <img src="./chevron-right.svg" alt="chevron-right"/>
            </a>
          </div>
    
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <img src="./chat-square-heart.svg" alt="chat-square-heart" height={30}/>
            </div>
            <h3 className="fs-2 text-body-emphasis">Custom Care Packages</h3>
            <p>
              We don’t believe in one-size-fits-all. From quick washes to full-detail packages, we customize our services to suit your car’s unique needs. Whether you drive a lowrider, a muscle car, or the family van, you’re in good hands.
            </p>
            <a href="#" class="icon-link">
              Explore Our Packages
              <img src="./chevron-right.svg" alt="chevron-right"/>
            </a>
          </div>
        </div>
      </div>
    )
};


export default Features; 


