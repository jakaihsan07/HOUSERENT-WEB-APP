import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const AdminAllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const navigate = useNavigate();

  const getAllBooking = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/admin/getallbookings",
        { withCredentials: true }
      );

      if (response.data.success) {
        setAllBookings(response.data.data);
      } else {
        message.error(response.data.message || "Unauthorized access");
        navigate("/login"); 
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch bookings");
      }
    }
  };


  useEffect(() => {
    getAllBooking();
  }, []);

  return (
  <div className="overflow-x-auto mt-6">
    <table className="min-w-full border border-[#d6a85c]/20 bg-[#2b221d]/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-stone-300">
      <thead className="bg-[#d6a85c] text-[#1f1a17]">
        <tr>
          <th className="py-4 px-4 text-left font-bold">Booking ID</th>
          <th className="py-4 px-4 text-center font-bold">Owner ID</th>
          <th className="py-4 px-4 text-center font-bold">Property ID</th>
          <th className="py-4 px-4 text-center font-bold">Tenant ID</th>
          <th className="py-4 px-4 text-center font-bold">Tenant Name</th>
          <th className="py-4 px-4 text-center font-bold">Tenant Contact</th>
          <th className="py-4 px-4 text-center font-bold">Booking Status</th>
        </tr>
      </thead>

      <tbody>
        {allBookings.length > 0 ? (
          allBookings.map((booking, index) => (
            <tr
              key={booking._id}
              className={`transition duration-200 border-b border-[#d6a85c]/10 ${
                index % 2 === 0 ? "bg-[#1f1a17]/50" : "bg-[#2b221d]/60"
              } hover:bg-[#1f1a17]/80`}
            >
              <td className="py-4 px-4 text-stone-300">
                {booking._id}
              </td>

              <td className="py-4 px-4 text-center text-stone-300">
                {booking.ownerID}
              </td>

              <td className="py-4 px-4 text-center text-[#d6a85c] font-bold">
                {booking.propertyId}
              </td>

              <td className="py-4 px-4 text-center text-stone-300">
                {booking.userID}
              </td>

              <td className="py-4 px-4 text-center text-stone-100 font-medium">
                {booking.userName}
              </td>

              <td className="py-4 px-4 text-center text-stone-300">
                {booking.phone}
              </td>

              <td
                className={`py-4 px-4 text-center font-bold ${
                  booking.bookingStatus === "Confirmed" ||
                  booking.bookingStatus === "booked"
                    ? "text-green-400"
                    : booking.bookingStatus === "Pending" ||
                      booking.bookingStatus === "pending"
                    ? "text-[#d6a85c]"
                    : "text-red-400"
                }`}
              >
                {booking.bookingStatus}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="7"
              className="text-center py-8 text-stone-400 font-medium italic bg-[#1f1a17]/50"
            >
              No bookings found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default AdminAllBookings;
