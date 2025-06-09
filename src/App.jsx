import React from 'react';
import Navbar from './components/Navbar';
import MovieSlider from './components/MovieSlider';
import "./App.css";


function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <main className="p-6 w-full">
        <div className="max-w-7xl mx-auto">
          <MovieSlider />
        </div>
      </main>
    </div>
  );
}

export default App;
