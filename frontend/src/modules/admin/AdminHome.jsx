import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import AllUsers from "./AllUsers";
import AllProperty from "./AllProperty";
import AllBookings from "./AllBookings";

const AdminHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user || !user.userData) return null;

  return (
    <div className="min-h-screen bg-[#1f1a17] text-stone-100 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#2b221d]/95 backdrop-blur-lg shadow-md border-b border-[#d6a85c]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[#d6a85c] tracking-wide">
              RentEase
            </h2>
            <p className="text-stone-400 text-sm mt-1">
              Admin Dashboard
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-stone-300">
              Hi,{" "}
              <span className="text-[#d6a85c] font-semibold">
                {user.userData.name}
              </span>
            </span>

            <button
              onClick={handleLogOut}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md font-semibold"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-10">
        <div className="bg-[#2b221d] border border-[#d6a85c]/20 rounded-2xl p-8 shadow-2xl">
          <p className="text-[#d6a85c] font-semibold tracking-[0.25em] uppercase text-sm">
            System Management
          </p>

          <h1 className="text-4xl font-bold mt-3 text-stone-100">
            Manage RentEase Platform
          </h1>

          <p className="text-stone-400 mt-3 max-w-2xl">
            Monitor users, rental properties, and booking activities from one
            centralized admin dashboard.
          </p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="max-w-7xl mx-auto w-full py-8 px-6">
        <div className="bg-[#2b221d]/95 border border-[#d6a85c]/20 shadow-2xl rounded-2xl p-6 backdrop-blur-md">
          {/* Tabs */}
          <div className="flex gap-3 border-b border-[#d6a85c]/20 pb-4">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 text-sm font-bold rounded-lg transition ${
                activeTab === "users"
                  ? "bg-[#d6a85c] text-[#1f1a17] shadow"
                  : "text-stone-300 hover:bg-[#1f1a17] hover:text-[#d6a85c]"
              }`}
            >
              All Users
            </button>

            <button
              onClick={() => setActiveTab("properties")}
              className={`px-6 py-3 text-sm font-bold rounded-lg transition ${
                activeTab === "properties"
                  ? "bg-[#d6a85c] text-[#1f1a17] shadow"
                  : "text-stone-300 hover:bg-[#1f1a17] hover:text-[#d6a85c]"
              }`}
            >
              All Properties
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-6 py-3 text-sm font-bold rounded-lg transition ${
                activeTab === "bookings"
                  ? "bg-[#d6a85c] text-[#1f1a17] shadow"
                  : "text-stone-300 hover:bg-[#1f1a17] hover:text-[#d6a85c]"
              }`}
            >
              All Bookings
            </button>
          </div>

          {/* Tab Panels */}
          <div className="bg-[#1f1a17] border border-[#d6a85c]/10 mt-6 p-6 shadow-xl rounded-xl text-stone-200">
            {activeTab === "users" && <AllUsers />}
            {activeTab === "properties" && <AllProperty />}
            {activeTab === "bookings" && <AllBookings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;