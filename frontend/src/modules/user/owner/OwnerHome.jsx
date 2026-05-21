import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import AllBookings from "./AllBookings";

const tabs = [
  { name: "Add Property", component: <AddProperty /> },
  { name: "All Properties", component: <AllProperties /> },
  { name: "All Bookings", component: <AllBookings /> },
];

const OwnerHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#1f1a17] text-stone-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#2b221d]/95 backdrop-blur-lg shadow-md border-b border-[#d6a85c]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#d6a85c] tracking-wide">
              RentEase
            </h2>
            <p className="text-stone-400 text-sm mt-1">
              Owner Dashboard
            </p>
          </div>

          <div className="flex items-center gap-6">
            <h5 className="font-medium text-stone-300">
              Hi,{" "}
              <span className="text-[#d6a85c] font-semibold">
                {user.userData.name}
              </span>
            </h5>

            <button
              onClick={handleLogOut}
              className="px-5 py-2 text-sm bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200 font-semibold"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="bg-[#2b221d] border border-[#d6a85c]/20 rounded-2xl p-8 shadow-2xl">
          <p className="text-[#d6a85c] font-semibold tracking-[0.25em] uppercase text-sm">
            Property Management
          </p>

          <h1 className="text-4xl font-bold mt-3 text-stone-100">
            Manage Your Rental Properties
          </h1>

          <p className="text-stone-400 mt-3 max-w-2xl">
            Add new listings, manage your existing properties, and review
            booking requests from renters in one dashboard.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-[#2b221d]/95 border border-[#d6a85c]/20 shadow-2xl rounded-2xl p-6 backdrop-blur-md">
          <div className="flex gap-3 border-b border-[#d6a85c]/20 pb-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 font-bold text-sm transition-all duration-200 rounded-lg ${
                  activeTab === index
                    ? "bg-[#d6a85c] text-[#1f1a17] shadow"
                    : "text-stone-300 hover:text-[#d6a85c] hover:bg-[#1f1a17]"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-[#1f1a17] border border-[#d6a85c]/10 mt-6 p-6 shadow-xl rounded-xl transition-all">
            {tabs[activeTab].component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;