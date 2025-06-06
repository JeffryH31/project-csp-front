import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Layout from './layout/AdminLayout';
import MoviesPage from './pages/MoviesPage';
import SchedulesPage from './pages/SchedulesPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" eelement={<Layout />} />

        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="schedules" element={<SchedulesPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;