import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import PropTypes from "prop-types";
import AllPropertiesCards from "../AllPropertiesCards";
import AllProperty from "./AllProperties";

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} className="w-full mt-6">
      {value === index && <div>{children}</div>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const RenterHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen bg-[#1f1a17] text-stone-100">
      {/* Navbar */}
      <nav className="bg-[#2b221d]/95 border-b border-[#d6a85c]/20 backdrop-blur-lg shadow-md px-8 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-[#d6a85c] tracking-wide">
            RentEase
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Renter Dashboard
          </p>
        </div>

        <div className="flex items-center gap-6">
          <h5 className="font-medium text-stone-200">
            Hi, <span className="text-[#d6a85c]">{user.userData.name}</span>
          </h5>

          <Link
            to="/"
            onClick={handleLogOut}
            className="px-5 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold shadow"
          >
            Log Out
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-6xl mx-auto mt-10 px-6">
        <div className="bg-[#2b221d] border border-[#d6a85c]/20 rounded-2xl p-8 shadow-2xl">
          <p className="text-[#d6a85c] font-semibold tracking-[0.25em] uppercase text-sm">
            Welcome Back
          </p>

          <h1 className="text-4xl font-bold mt-3 text-stone-100">
            Find Your Next Comfortable Home
          </h1>

          <p className="text-stone-400 mt-3 max-w-2xl">
            Browse available rental properties and check your booking history
            easily through your renter dashboard.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-6xl mx-auto mt-8 px-6 pb-14">
        <div className="bg-[#2b221d]/95 border border-[#d6a85c]/20 shadow-2xl rounded-2xl p-6 backdrop-blur-md">
          <div className="flex gap-3 border-b border-[#d6a85c]/20 pb-4">
            <button
              className={`px-6 py-3 text-sm font-bold rounded-lg transition ${
                value === 0
                  ? "bg-[#d6a85c] text-[#1f1a17] shadow"
                  : "text-stone-300 hover:bg-[#1f1a17] hover:text-[#d6a85c]"
              }`}
              onClick={() => setValue(0)}
            >
              All Properties
            </button>

            <button
              className={`px-6 py-3 text-sm font-bold rounded-lg transition ${
                value === 1
                  ? "bg-[#d6a85c] text-[#1f1a17] shadow"
                  : "text-stone-300 hover:bg-[#1f1a17] hover:text-[#d6a85c]"
              }`}
              onClick={() => setValue(1)}
            >
              Booking History
            </button>
          </div>

          {/* Tab Panels */}
          <CustomTabPanel value={value} index={0}>
            <div className="mt-6">
              <AllPropertiesCards loggedIn={user.userLoggedIn} />
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <div className="mt-6">
              <AllProperty />
            </div>
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
};

export default RenterHome;