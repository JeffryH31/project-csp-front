import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";


import { PencilIcon } from '@heroicons/react/24/solid';

const formatToRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number || 0);
};

const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
        className="flex items-center cursor-pointer p-2 group"
        onClick={onClick}
        ref={ref}
    >
        <PencilIcon
            className="h-5 w-5 text-gray-400 mr-2 transition-colors duration-200 ease-in-out group-hover:text-blue-500"
        />
        <span
            className="font-semibold text-gray-700 transition-colors duration-200 ease-in-out group-hover:text-blue-500"
        >
            {value}
        </span>
    </div>
));

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const formattedLabel = format(new Date(label), 'eeee, d MMMM yyyy');

        return (
            <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-xl">
                <p className="font-bold text-gray-800 mb-2">{formattedLabel}</p>
                {payload.map((pld, index) => (
                    <div key={index} style={{ color: pld.stroke }} className="flex justify-between items-center text-sm">
                        <span>{pld.name}:</span>
                        <span className="font-semibold ml-4">
                            {pld.name === 'Revenue' ? formatToRupiah(pld.value) : pld.value.toLocaleString('id-ID')}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const DashboardPage = () => {
    const [dailyStats, setDailyStats] = useState(null);
    const [monthlyStats, setMonthlyStats] = useState(null);
    const [yearlyStats, setYearlyStats] = useState(null);
    const [topMovies, setTopMovies] = useState([]);
    const [weeklyChart, setWeeklyChart] = useState([]);

    const [dailyDate, setDailyDate] = useState(new Date());
    const [monthlyDate, setMonthlyDate] = useState(new Date());
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        fetchData();
    }, [dailyDate, monthlyDate, year]);

    const fetchData = async () => {
        const formattedDaily = format(dailyDate, 'yyyy-MM-dd');
        const formattedMonthly = format(monthlyDate, 'yyyy-MM');

        try {
            const [daily, monthly, yearly, top, weekly] = await Promise.all([
                axios.get(`http://127.0.0.1:8000/api/statistics/daily?date=${formattedDaily}`),
                axios.get(`http://127.0.0.1:8000/api/statistics/monthly?month=${formattedMonthly}`),
                axios.get(`http://127.0.0.1:8000/api/statistics/yearly?year=${year}`),
                axios.get(`http://127.0.0.1:8000/api/statistics/top-movies`),
                axios.get(`http://127.0.0.1:8000/api/statistics/weekly-chart`)
            ]);

            setDailyStats(daily.data);
            setMonthlyStats(monthly.data);
            setYearlyStats(yearly.data);
            setTopMovies(top.data);
            setWeeklyChart(weekly.data);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        }
    };

    const maxTicketsSold = Array.isArray(topMovies) && topMovies.length > 0
    ? Math.max(...topMovies.map(movie => movie.tickets_sold))
    : 1;

    return (
        <div className="py-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Daily Sales</h2>
                            <div className="flex justify-end">
                                <DatePicker
                                    selected={dailyDate}
                                    onChange={(date) => setDailyDate(date)}
                                    customInput={<CustomDateInput />}
                                />
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-8'>
                            <p className="text-gray-600 text-2xl"><span className="font-semibold">{formatToRupiah(dailyStats?.revenue)}</span></p>
                            <p className="text-gray-600 text-lg"><span className="font-semibold">{dailyStats?.tickets_sold ?? 0}</span> tickets sold</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Monthly Sales</h2>
                            <div className="flex justify-start md:justify-end">
                                <DatePicker
                                    selected={monthlyDate}
                                    onChange={(date) => setMonthlyDate(date)}
                                    customInput={<CustomDateInput />}
                                    dateFormat="MMMM yyyy"
                                    showMonthYearPicker
                                />
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-4 md:mt-8'>
                            <p className="text-gray-600 text-2xl"><span className="font-semibold">{formatToRupiah(monthlyStats?.revenue)}</span></p>
                            <p className="text-gray-600 text-lg"><span className="font-semibold">{monthlyStats?.tickets_sold ?? 0}</span> tickets sold</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Yearly Sales</h2>
                            <div className="flex justify-start md:justify-end">
                                <DatePicker
                                    selected={new Date(year, 0, 1)}
                                    onChange={(date) => setYear(date.getFullYear())}
                                    customInput={<CustomDateInput />}
                                    dateFormat="yyyy"
                                    showYearPicker
                                />
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-4 md:mt-8'>
                            <p className="text-gray-600 text-2xl"><span className="font-semibold">{formatToRupiah(yearlyStats?.revenue)}</span></p>
                            <p className="text-gray-600 text-lg"><span className="font-semibold">{yearlyStats?.tickets_sold ?? 0}</span> tickets sold</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Top 5 Movies Leaderboard</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 w-12 text-center">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Movie Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Tickets Sold
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(topMovies) && topMovies.map((movie, i) => {
                                    const barPercentage = (movie.tickets_sold / maxTicketsSold) * 100;

                                    return (
                                        <tr key={i} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4 text-center font-bold text-gray-900">
                                                {i + 1}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {movie.title}
                                            </th>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end space-x-3">
                                                    <span className='font-semibold text-gray-900'>{movie.tickets_sold.toLocaleString('id-ID')}</span>
                                                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full"
                                                            style={{ width: `${barPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Weekly Sales Performance</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                            data={weeklyChart}
                            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.7} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.7} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

                            <XAxis
                                dataKey="date"
                                tickFormatter={(dateStr) => format(new Date(dateStr), 'd MMM')}
                                stroke="#6b7280"
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                stroke="#6b7280"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${new Intl.NumberFormat('id-ID').format(value / 1000)}k`}
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <Area
                                type="monotone"
                                dataKey="tickets_sold"
                                stroke="#8884d8"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#colorTickets)" 
                                name="Tickets Sold"
                                activeDot={{ r: 7, strokeWidth: 2, fill: '#fff' }} 
                            />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#82ca9d"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#colorRevenue)" 
                                name="Revenue"
                                activeDot={{ r: 7, strokeWidth: 2, fill: '#fff' }}
                            />

                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;