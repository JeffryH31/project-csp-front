import React from "react";
import Navbar from "../../components/Navbar";
import MovieSlider from "../../components/MovieSlider";
import PosterSlider from "../../components/PosterSlider";
import Footer from "../../components/common/Footer";

const Homepage = () => {
  return (
    <>
      <div className="aurora-background w-full min-h-screen">
        <Navbar />
        <main>
          <PosterSlider />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MovieSlider />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
