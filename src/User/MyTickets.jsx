// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Pastikan sudah install axios: npm install axios

// // Komponen untuk menampilkan satu kartu tiket
// const TicketCard = ({ ticket }) => {
//   return (
//     <div className="ticket-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px', display: 'flex' }}>
//       <img src={ticket.poster_url} alt={ticket.movie_title} style={{ width: '100px', height: '150px', objectFit: 'cover', marginRight: '16px' }} />
//       <div>
//         <h3>{ticket.movie_title}</h3>
//         <p><strong>Cinema:</strong> {ticket.cinema_name} - {ticket.cinema_location}</p>
//         <p><strong>Schedule:</strong> {new Date(ticket.show_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {ticket.show_time}</p>
//         <p><strong>Seat Number:</strong> {ticket.seat_number}</p>
//         <p><small>Booked on: {new Date(ticket.booking_date).toLocaleString('id-ID')}</small></p>
//       </div>
//     </div>
//   );
// };


// // Komponen utama halaman riwayat tiket
// const MyTickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fungsi untuk mengambil data dari API
//     const fetchMyTickets = async () => {
//       try {
//         // Ganti dengan cara Anda mendapatkan token (misal dari context atau local storage)
//         const token = localStorage.getItem('authToken');

//         if (!token) {
//           throw new Error("Autentikasi dibutuhkan.");
//         }

//         // URL akan di-proxy secara otomatis oleh Vite ke backend Laravel
//         const response = await axios.get('/api/my-bookings', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         setTickets(response.data.data);
//       } catch (err) {
//         setError(err.response ? err.response.data.message : err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyTickets();
//   }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali

//   if (loading) {
//     return <div>Loading your ticket history...</div>;
//   }

//   if (error) {
//     return <div style={{ color: 'red' }}>Error: {error}</div>;
//   }

//   return (
//     <div className="my-tickets-page" style={{ padding: '20px' }}>
//       <h2 className="font-bold mb-5">Order History</h2>
//       {tickets.length > 0 ? (
//         tickets.map(ticket => (
//           <TicketCard key={ticket.booking_id} ticket={ticket} />
//         ))
//       ) : (
//         <p>You don't have a booking history yet.</p>
//       )}
//     </div>
//   );
// };

// export default MyTickets;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to display a single ticket card
const TicketCard = ({ ticket }) => {
  const LARAVEL_BACKEND_URL = 'http://127.0.0.1:8000'; // Ensure this matches your backend URL

  const formatShowDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-EN', options);
    // Combine with time, assuming timeString is like "HH:MM"
    return `${formattedDate}, ${timeString}`;
  };

  return (
    <div className="bg-zinc-800 rounded-xl p-3 mb-4 flex items-start shadow-md w-full max-w-lg mx-auto">
      {/* Poster and "X tiket" label */}
      <div className="relative flex-shrink-0 mr-4">
        <img
          src={`${LARAVEL_BACKEND_URL}/storage/${ticket.poster_url}`}
          alt={ticket.movie_title}
          className="w-24 h-36 object-cover rounded-md" // Adjusted size to match image
        />
        {/* Number of tickets label (if available) */}
        {ticket.quantity && (
          <div className="absolute bottom-0 left-0 bg-white bg-opacity-20 backdrop-blur-xl rounded-br-md rounded-tl-md px-2 py-1 text-xs font-semibold text-white">
            {ticket.quantity} Ticket{ticket.quantity > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Ticket Details */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white mb-1 leading-tight">
          {ticket.movie_title}
        </h3>
        <p className="text-sm text-gray-300 mb-0.5">
          {ticket.cinema_name}
          {ticket.cinema_location && `, ${ticket.cinema_location}`} {/* Assuming location can be studio */}
        </p>
        <p className="text-sm text-gray-300 mb-2">
          {formatShowDateTime(ticket.show_date, ticket.show_time)}
        </p>

        {/* Status */}
        {ticket.status === 'completed' ? (
          <p className="text-sm text-green-400 font-semibold">
            Order complete
          </p>
        ) : (
          // You can show booking date or other status here if needed
          <p className="text-xs text-gray-400">Status: Pending</p>
        )}
      </div>
    </div>
  );
};

// Main component for the ticket history page
const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchMyTickets = async () => {
      try {
        // Assume authentication is handled elsewhere, or add token if needed
        // const token = localStorage.getItem('authToken');
        // const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const response = await axios.get('/api/my-bookings');
        // Temporarily add quantity and status for display matching the image
        const formattedTickets = response.data.data.map(ticket => ({
            ...ticket,
            quantity: Math.floor(Math.random() * 3) + 1, // Random 1-3 tickets for demo
            status: 'completed' // Hardcode status for now to match image
        }));
        setTickets(formattedTickets);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, []); // Empty dependency array so useEffect runs only once

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex justify-center items-center">
        <p className="text-white text-lg">Loading your ticket history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex justify-center items-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header with back arrow and title */}
        <div className="flex items-center mb-6">
          {/* Back arrow - you might use an actual icon library like Heroicons */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-3 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <h2 className="text-2xl font-bold text-white">Order History</h2>
        </div>

        {/* Removed "Film" / "m.food" tabs and "Tampilkan Bulan Ini" button as per request */}

        {/* Ticket List */}
        <div className="mt-6">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketCard key={ticket.booking_id} ticket={ticket} />
            ))
          ) : (
            <div className="p-8 bg-zinc-800 rounded-lg text-center text-gray-400 shadow-sm mx-auto max-w-lg">
              <p>You don't have any order history yet.</p>
              {/* Optional: Add a subtle icon or image */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;