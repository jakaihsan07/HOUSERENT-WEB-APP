import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../common/Toast";
import { useNavigate } from "react-router-dom";


axios.defaults.withCredentials = true;

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/admin/getallusers"
      );
      if (response.data.success) {
        setAllUser(response.data.data);
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
        message.error("Failed to fetch Users");
      }
    }
  };

  const handleStatus = async (userid, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/admin/handlestatus",
        { userid, status }
      );

      if (res.data.success) {
        showToast("success", "Status updated successfully");
        getAllUser();
      } else {
        showToast("error", res.data.message);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to update status");
    }
  };

  return (
  <div className="overflow-x-auto relative mt-6">
    {toast.show && (
      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
    )}

    <table className="min-w-full border border-[#d6a85c]/20 bg-[#2b221d]/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-stone-300">
      <thead className="bg-[#d6a85c] text-[#1f1a17]">
        <tr>
          <th className="py-4 px-4 text-left font-bold">User ID</th>
          <th className="py-4 px-4 text-center font-bold">Name</th>
          <th className="py-4 px-4 text-center font-bold">Email</th>
          <th className="py-4 px-4 text-center font-bold">Type</th>
          <th className="py-4 px-4 text-center font-bold">
            Granted Owner
          </th>
          <th className="py-4 px-4 text-center font-bold">Actions</th>
        </tr>
      </thead>

      <tbody>
        {allUser.length > 0 ? (
          allUser.map((user, index) => (
            <tr
              key={user._id}
              className={`transition duration-200 border-b border-[#d6a85c]/10 ${
                index % 2 === 0 ? "bg-[#1f1a17]/50" : "bg-[#2b221d]/60"
              } hover:bg-[#1f1a17]/80`}
            >
              <td className="py-4 px-4 text-stone-300">
                {user._id}
              </td>

              <td className="py-4 px-4 text-center text-stone-100 font-medium">
                {user.name}
              </td>

              <td className="py-4 px-4 text-center text-stone-300">
                {user.email}
              </td>

              <td className="py-4 px-4 text-center text-[#d6a85c] font-bold">
                {user.type}
              </td>

              <td
                className={`py-4 px-4 text-center font-bold ${
                  user.granted === "granted"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {user.type === "Owner" ? user.granted : "-"}
              </td>

              <td className="py-4 px-4 text-center">
                {user.type === "Owner" && user.granted === "ungranted" && (
                  <button
                    onClick={() => handleStatus(user._id, "granted")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow font-semibold"
                  >
                    Grant
                  </button>
                )}

                {user.type === "Owner" && user.granted === "granted" && (
                  <button
                    onClick={() => handleStatus(user._id, "ungranted")}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow font-semibold"
                  >
                    Ungrant
                  </button>
                )}

                {user.type !== "Owner" && (
                  <span className="text-stone-500 italic">No action</span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="6"
              className="text-center py-8 text-stone-400 font-medium italic bg-[#1f1a17]/50"
            >
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default AllUsers;
