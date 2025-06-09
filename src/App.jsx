import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/AdminLayout";
import MoviesPage from "./pages/Admin/MoviesPage";
import SchedulesPage from "./pages/Admin/SchedulesPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import Movie_Detail from "./pages/User/Movie_Detail";
import MyTickets from "./pages/User/MyTickets";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/movies/:id" element={<Movie_Detail />} />
        <Route path="/history" element={<MyTickets />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="schedules" element={<SchedulesPage />} />
        </Route>

        {/* Default Redirect (optional) */}
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
