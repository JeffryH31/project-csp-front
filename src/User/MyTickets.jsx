import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Pastikan sudah install axios: npm install axios

// Komponen untuk menampilkan satu kartu tiket
const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px', display: 'flex' }}>
      <img src={ticket.poster_url} alt={ticket.movie_title} style={{ width: '100px', height: '150px', objectFit: 'cover', marginRight: '16px' }} />
      <div>
        <h3>{ticket.movie_title}</h3>
        <p><strong>Bioskop:</strong> {ticket.cinema_name} - {ticket.cinema_location}</p>
        <p><strong>Jadwal:</strong> {new Date(ticket.show_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {ticket.show_time}</p>
        <p><strong>Nomor Kursi:</strong> {ticket.seat_number}</p>
        <p><small>Dipesan pada: {new Date(ticket.booking_date).toLocaleString('id-ID')}</small></p>
      </div>
    </div>
  );
};


// Komponen utama halaman riwayat tiket
const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchMyTickets = async () => {
      try {
        // Ganti dengan cara Anda mendapatkan token (misal dari context atau local storage)
        const token = localStorage.getItem('authToken');

        if (!token) {
           throw new Error("Autentikasi dibutuhkan.");
        }

        // URL akan di-proxy secara otomatis oleh Vite ke backend Laravel
        const response = await axios.get('/api/my-bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setTickets(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali

  if (loading) {
    return <div>Memuat riwayat tiket Anda...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="my-tickets-page" style={{ padding: '20px' }}>
      <h2>Riwayat Tiket Saya</h2>
      {tickets.length > 0 ? (
        tickets.map(ticket => (
          <TicketCard key={ticket.booking_id} ticket={ticket} />
        ))
      ) : (
        <p>Anda belum memiliki riwayat pemesanan.</p>
      )}
    </div>
  );
};

export default MyTickets;