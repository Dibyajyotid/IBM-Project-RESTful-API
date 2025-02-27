import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-screen h-[500px] overflow-hidden mx-auto -mt-8">
      {/* First Image Section */}
      <section
        className="relative w-full h-full bg-cover bg-center animate-fadeIn"
        style={{ backgroundImage: "url('images/Kaziranga-Rhino.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-2 left-0 right-0 text-center animate-fadeUp">
          <img
            src="images/Kaziranga-Rhino.jpg"
            alt="Kaziranga rhino in its natural habitat"
            className="w-4/5 max-w-full opacity-0 transition-opacity duration-1000"
          />
        </div>
      </section>

      {/* Second Image Section */}
      <section
        className="absolute bottom-0 w-full h-[41%] bg-cover bg-top animate-slideUpFromBottom"
        style={{ backgroundImage: "url('images/Slide.png')" }}
      >
        <div className="absolute inset-0"></div>
        <div className="absolute bottom-2 left-0 right-0 text-center animate-fadeUp">
          <img
            src="images/Slide.png"
            alt="A beautiful landscape view"
            className="w-4/5 max-w-full opacity-0 transition-opacity duration-1000"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
