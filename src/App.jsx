import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/AdminLayout";
import MoviesPage from "./pages/Admin/MoviesPage";
import SchedulesPage from "./pages/Admin/SchedulesPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import MyTickets from "./pages/User/MyTickets";
import MovieDetails from "./pages/User/MovieDetails";
import SeatSelection from "./pages/User/SeatSelection";
import OrderConfirmation from "./pages/User/OrderConfirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/history" element={<MyTickets />} />
        <Route path="/seats/:schedule_id" element={<SeatSelection />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

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
