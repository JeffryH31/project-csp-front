import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartPieIcon,
  FilmIcon,
  CalendarDaysIcon,
  TicketIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const AdminLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    toast.success("You have been successfully logged out.");
    navigate("/login");
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: ChartPieIcon },
    { to: "/admin/movies", label: "Movies", icon: FilmIcon },
    { to: "/admin/schedules", label: "Schedules", icon: CalendarDaysIcon },
    { to: "/admin/bookings", label: "Bookings", icon: TicketIcon },
  ];

  const baseLinkClasses =
    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200";
  const activeLinkClasses = "bg-slate-900 text-white";
  const inactiveLinkClasses =
    "text-slate-300 hover:bg-slate-700 hover:text-white";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-slate-800 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <NavLink to="/admin" className="font-bold text-xl tracking-tight">
                Admin
              </NavLink>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative" ref={profileMenuRef}>
                  <div>
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      type="button"
                      className="max-w-xs bg-slate-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                    >
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className="h-8 w-8 text-slate-400" />
                    </button>
                  </div>
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          <p className="font-semibold">Signed in as</p>
                          <p className="truncate">{user?.name || "Admin"}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-gray-500" />
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `${baseLinkClasses} w-full ${
                        isActive ? activeLinkClasses : inactiveLinkClasses
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-slate-700">
                <div className="flex items-center px-5">
                  <UserCircleIcon className="h-10 w-10 text-slate-400" />
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user?.name || "Admin"}
                    </div>
                    <div className="text-sm font-medium leading-none text-slate-400">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
