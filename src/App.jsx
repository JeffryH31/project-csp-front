import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/AdminLayout";
import MoviesPage from "./pages/Admin/MoviesPage";
import SchedulesPage from "./pages/Admin/SchedulesPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import Movie_Detail from "./User/Movie_Detail"; 
import "./App.css";
import MyTickets from "./User/MyTickets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" eelement={<Layout />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<Movie_Detail />} />
        <Route path="schedules" element={<SchedulesPage />} />
        <Route path="/history" element={<MyTickets />} />
        <Route path="/admin" element={<Layout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
