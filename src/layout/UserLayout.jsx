import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <div className="aurora-background w-full min-h-screen">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
