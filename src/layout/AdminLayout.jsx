import React, { useState, Fragment } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    ChartPieIcon,
    FilmIcon,
    CalendarDaysIcon,
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon, 
} from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react'; 

const AdminLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { to: '/admin/dashboard', label: 'Dashboard', icon: ChartPieIcon },
        { to: '/admin/movies', label: 'Movies', icon: FilmIcon },
        { to: '/admin/schedules', label: 'Schedules', icon: CalendarDaysIcon },
    ];

    const baseLinkClasses =
        'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200';
    const activeLinkClasses = 'bg-slate-900 text-white';
    const inactiveLinkClasses =
        'text-slate-300 hover:bg-slate-700 hover:text-white transform hover:scale-105';

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
                                        `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                                    }
                                >
                                    <item.icon className="h-5 w-5 mr-2" />
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button className="p-1 rounded-full text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white">
                                    <span className="sr-only">View notifications</span>
                                    <UserCircleIcon className="h-7 w-7" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="sr-only">Buka menu utama</span>
                                {isMenuOpen ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`
            md:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
                    id="mobile-menu"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `${baseLinkClasses} w-full ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                                }
                                onClick={() => setIsMenuOpen(false)} 
                            >
                                <item.icon className="h-5 w-5 mr-3" />
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;