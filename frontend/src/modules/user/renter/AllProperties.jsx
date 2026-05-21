import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const RenterAllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);
  const navigate = useNavigate();

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/user/getallbookings",
        { withCredentials: true }
      );

      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error(response.data.message);
        navigate("/login")
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch properties");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  return (
  <div className="overflow-x-auto bg-[#2b221d]/95 backdrop-blur-md border border-[#d6a85c]/20 shadow-2xl rounded-2xl p-6">
    <h2 className="text-xl font-bold text-[#d6a85c] mb-4">
      All My Bookings
    </h2>

    <table className="min-w-full border border-[#d6a85c]/20 text-sm rounded-xl overflow-hidden text-stone-300">
      <thead className="bg-[#d6a85c] text-[#1f1a17]">
        <tr>
          <th className="px-4 py-3 border-b border-[#d6a85c]/20 text-left font-bold">
            Booking ID
          </th>
          <th className="px-4 py-3 border-b border-[#d6a85c]/20 text-left font-bold">
            Property ID
          </th>
          <th className="px-4 py-3 border-b border-[#d6a85c]/20 text-center font-bold">
            Tenant Name
          </th>
          <th className="px-4 py-3 border-b border-[#d6a85c]/20 text-center font-bold">
            Phone
          </th>
          <th className="px-4 py-3 border-b border-[#d6a85c]/20 text-center font-bold">
            Booking Status
          </th>
        </tr>
      </thead>

      <tbody>
        {allProperties.length > 0 ? (
          allProperties.map((booking, index) => (
            <tr
              key={booking._id}
              className={`${
                index % 2 === 0 ? "bg-[#1f1a17]/50" : "bg-[#2b221d]/60"
              } hover:bg-[#1f1a17]/80 transition-colors border-b border-[#d6a85c]/10`}
            >
              <td className="px-4 py-3 text-stone-300">
                {booking._id}
              </td>

              <td className="px-4 py-3 text-stone-300">
                {booking.propertyId}
              </td>

              <td className="px-4 py-3 text-center text-stone-100 font-medium">
                {booking.userName}
              </td>

              <td className="px-4 py-3 text-center text-stone-300">
                {booking.phone}
              </td>

              <td
                className={`px-4 py-3 text-center font-bold ${
                  booking.bookingStatus === "booked"
                    ? "text-green-400"
                    : "text-[#d6a85c]"
                }`}
              >
                {booking.bookingStatus}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              className="text-center py-6 text-stone-400 font-medium italic bg-[#1f1a17]/50"
            >
              No bookings found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default RenterAllProperty;

