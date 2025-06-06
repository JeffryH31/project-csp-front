import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
    const activeLinkStyle = {
        backgroundColor: '#4a5568',
        color: 'white',
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between">
                    <span className="font-bold text-xl">Admin</span>
                    <div>
                        <NavLink 
                            to="/" 
                            className="px-3 py-2 rounded-md text-sm font-medium"
                            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink 
                            to="/movies" 
                            className="ml-4 px-3 py-2 rounded-md text-sm font-medium"
                            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        >
                            Movies
                        </NavLink>
                         <NavLink 
                            to="/schedules" 
                            className="ml-4 px-3 py-2 rounded-md text-sm font-medium"
                            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        >
                            Schedules
                        </NavLink>
                    </div>
                </div>
            </nav>
            <main className="mx-auto py-6 px-4 sm:px-8 lg:px-24">
                <Outlet /> 
            </main>
        </div>
    );
};

export default Layout;