import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const AdminAllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);
  const navigate = useNavigate();

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/admin/getallproperties",
        { withCredentials: true }
      );

      if (response.data.success) {
        setAllProperties(response.data.data);
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
        message.error("Failed to fetch Property");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  return (
  <div className="overflow-x-auto mt-6">
    <table className="min-w-full border border-[#d6a85c]/20 bg-[#2b221d]/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-stone-300">
      <thead className="bg-[#d6a85c] text-[#1f1a17]">
        <tr>
          <th className="py-4 px-4 text-left font-bold">Property ID</th>
          <th className="py-4 px-4 text-center font-bold">Owner ID</th>
          <th className="py-4 px-4 text-center font-bold">Property Type</th>
          <th className="py-4 px-4 text-center font-bold">Property Ad Type</th>
          <th className="py-4 px-4 text-center font-bold">Property Address</th>
          <th className="py-4 px-4 text-center font-bold">Owner Contact</th>
          <th className="py-4 px-4 text-center font-bold">Property Amt</th>
        </tr>
      </thead>

      <tbody>
        {allProperties.length > 0 ? (
          allProperties.map((property, index) => (
            <tr
              key={property._id}
              className={`transition duration-200 border-b border-[#d6a85c]/10 ${
                index % 2 === 0 ? "bg-[#1f1a17]/50" : "bg-[#2b221d]/60"
              } hover:bg-[#1f1a17]/80`}
            >
              <td className="py-4 px-4 text-stone-300">
                {property._id}
              </td>

              <td className="py-4 px-4 text-center text-stone-300">
                {property.ownerId}
              </td>

              <td className="py-4 px-4 text-center text-[#d6a85c] font-bold">
                {property.propertyType}
              </td>

              <td className="py-4 px-4 text-center text-stone-300">
                {property.propertyAdType || "N/A"}
              </td>

              <td className="py-4 px-4 text-center text-stone-300">
                {property.propertyAddress}
              </td>

              <td className="py-4 px-4 text-center text-stone-300">
                {property.ownerContact}
              </td>

              <td className="py-4 px-4 text-center font-bold text-green-400">
                ₹{property.propertyAmt}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="7"
              className="text-center py-8 text-stone-400 font-medium italic bg-[#1f1a17]/50"
            >
              No properties found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default AdminAllProperty;
