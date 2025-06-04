import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Admin';
import MoviesPage from './pages/MoviesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<DashboardPage />} /> */}
          <Route path="movies" element={<MoviesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;