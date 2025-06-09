import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/AdminLayout";
import MoviesPage from "./pages/MoviesPage";
import SchedulesPage from "./pages/SchedulesPage";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie_Detail from "./User/Movie_Detail"; // adjust path if needed
import "./App.css";
import MyTickets from "./User/MyTickets";

// import Movie_Detail from "./User/Movie_Detail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" eelement={<Layout />} />

        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<Movie_Detail />} />
          <Route path="schedules" element={<SchedulesPage />} />
          <Route path="/history" element={<MyTickets />} />
          {/* Add other routes here as needed */}
          {/* Example: <Route path="/" element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
