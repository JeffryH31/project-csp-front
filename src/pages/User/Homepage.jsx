import React from 'react'
import Navbar from '../../components/Navbar';
import MovieSlider from '../../components/MovieSlider';
import PosterSlider from '../../components/PosterSlider';

const Homepage = () => {
  return (
    <div className="w-full min-h-screen bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]">
      <Navbar />
      <main>
        <PosterSlider />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MovieSlider />
        </div>
      </main>
    </div>
  );
}

export default Homepage;