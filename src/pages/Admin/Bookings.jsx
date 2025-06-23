import React, { useState, useEffect } from "react";
import BookingTable from "../../components/bookings/BookingTable";
import { AxiosInstance } from "../../helper/AxiosInstance";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const instance = AxiosInstance();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/bookings");
      setBookings(response.data.data);
    } catch (error) {
      Swal.fire("Error!", "Could not fetch bookings data.", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bookings</h1>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading data...</div>
      ) : (
        <BookingTable bookings={bookings} />
      )}
    </div>
  );
};

export default Bookings;
