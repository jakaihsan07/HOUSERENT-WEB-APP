import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

axios.defaults.withCredentials = true; 

const OwnerAllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const navigate = useNavigate();
 const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/owner/getallbookings",
        { withCredentials: true }
      );

      if (response.data.success) {
        setAllBookings(response.data.data);
      } else {
        message.error(response.data.message || "Unauthorized access");
        navigate("/login"); 
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch bookings");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const handleStatus = async (bookingId, propertyId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/owner/handlebookingstatus",
        { bookingId, propertyId, status },
        { withCredentials: true }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getAllProperty();
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to update booking status");
    }
  };

  return (
  <div className="overflow-x-auto mt-6">
    <table className="min-w-full border border-[#d6a85c]/20 rounded-xl shadow-2xl bg-[#2b221d]/95 backdrop-blur-md text-stone-300 overflow-hidden">
      <thead className="bg-[#d6a85c] text-[#1f1a17]">
        <tr>
          <th className="py-4 px-4 text-left font-bold">Booking ID</th>
          <th className="py-4 px-4 text-center font-bold">Property ID</th>
          <th className="py-4 px-4 text-center font-bold">Tenant Name</th>
          <th className="py-4 px-4 text-center font-bold">Tenant Phone</th>
          <th className="py-4 px-4 text-center font-bold">Booking Status</th>
          <th className="py-4 px-4 text-center font-bold">Actions</th>
        </tr>
      </thead>

      <tbody>
        {allBookings.length > 0 ? (
          allBookings.map((booking, idx) => (
            <tr
              key={booking._id}
              className={`border-b border-[#d6a85c]/10 transition duration-200 hover:bg-[#1f1a17]/80 ${
                idx % 2 === 0 ? "bg-[#1f1a17]/50" : "bg-[#2b221d]/60"
              }`}
            >
              <td className="py-4 px-4 text-stone-300">{booking._id}</td>

              <td className="py-4 px-4 text-center text-stone-300">
                {booking.propertyId}
              </td>

              <td className="py-4 px-4 text-center text-stone-100 font-medium">
                {booking.userName}
              </td>

              <td className="py-4 px-4 text-center text-stone-300">
                {booking.phone}
              </td>

              <td
                className={`py-4 px-4 text-center font-bold ${
                  booking.bookingStatus === "booked"
                    ? "text-green-400"
                    : "text-[#d6a85c]"
                }`}
              >
                {booking.bookingStatus}
              </td>

              <td className="py-4 px-4 text-center">
                {booking.bookingStatus === "pending" ? (
                  <button
                    onClick={() =>
                      handleStatus(booking._id, booking.propertyId, "booked")
                    }
                    className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-md font-semibold"
                  >
                    Mark Booked
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleStatus(booking._id, booking.propertyId, "pending")
                    }
                    className="px-4 py-2 text-sm bg-[#d6a85c] hover:bg-[#c5964b] text-[#1f1a17] rounded-lg transition shadow-md font-semibold"
                  >
                    Mark Pending
                  </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={6}
              className="py-8 px-4 text-center text-stone-400 italic bg-[#1f1a17]/50"
            >
              No bookings available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
};

export default OwnerAllBookings;
