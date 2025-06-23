import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layouts
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";

// Components
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Homepage from "./pages/User/Homepage";
import MovieDetails from "./pages/User/MovieDetails";
import SeatSelection from "./pages/User/SeatSelection";
import OrderConfirmation from "./pages/User/OrderConfirmation";
import History from "./pages/User/History";
import TicketDetails from "./pages/User/TicketDetails";
import AuthPage from "./pages/User/AuthPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import MoviesPage from "./pages/Admin/MoviesPage";
import Bookings from "./pages/Admin/Bookings";
import SchedulesPage from "./pages/Admin/SchedulesPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition:Bounce
      />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        
        <Route element={<UserLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/seats/:schedule_id" element={<SeatSelection />} />

          {/* User */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/history" element={<History />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/ticket/:bookingId" element={<TicketDetails />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="schedules" element={<SchedulesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
