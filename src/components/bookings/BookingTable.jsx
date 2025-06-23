import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarDaysIcon, TicketIcon } from "@heroicons/react/24/outline";

const BookingTable = ({ bookings }) => {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                User & Movie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Seats Booked
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Booking Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-200 hover:bg-slate-50 align-top"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-900">
                      {booking.user_name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {booking.movie_title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-800">
                      <TicketIcon className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                      <span className="font-semibold break-words max-w-xs">
                        {booking.seat_numbers}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {format(
                            new Date(booking.booking_time),
                            "eeee, d MMM yyyy",
                            { locale: id }
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          Pukul{" "}
                          {format(new Date(booking.booking_time), "HH:mm")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-900">
                      {formatCurrency(booking.total_price)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-12 text-slate-500">
                  No booking data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
