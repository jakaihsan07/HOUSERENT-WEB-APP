import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";

axios.defaults.withCredentials = true;

const Register = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.type) {
      return showToast("error", "Please fill all fields");
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/api/user/register",
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        showToast("success", response.data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#1f1a17] flex flex-col">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() =>
            setToast({
              ...toast,
              show: false,
            })
          }
        />
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#2b221d]/90 backdrop-blur-lg shadow-md py-4 px-8 flex justify-between items-center border-b border-[#d6a85c]/20">
        <h2 className="text-3xl font-extrabold text-[#d6a85c] tracking-wide">
          RentEase
        </h2>

        <div className="space-x-8 text-lg">
          <Link
            to="/"
            className="text-stone-200 hover:text-[#d6a85c] transition font-medium"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-stone-200 hover:text-[#d6a85c] transition font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-[#1f1a17] bg-[#d6a85c] px-5 py-2 rounded-lg shadow hover:bg-[#c5964b] transition font-semibold"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex-grow flex justify-center items-center px-4 pt-24">
        <div className="w-full max-w-md bg-[#2b221d]/95 border border-[#d6a85c]/20 backdrop-blur-md shadow-2xl rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#d6a85c]/15 text-[#d6a85c] text-3xl font-bold shadow-inner border border-[#d6a85c]/30">
              🏠
            </div>

            <h1 className="text-3xl font-bold mt-5 text-stone-100">
              Create Account
            </h1>

            <p className="text-stone-400 mt-2">
              Join RentEase as a renter or owner.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-stone-300 mb-2 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Renter Full Name / Owner Name"
                className="w-full px-4 py-3 bg-[#1f1a17] border border-stone-700 text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#1f1a17] border border-stone-700 text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-2 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Create your password"
                className="w-full px-4 py-3 bg-[#1f1a17] border border-stone-700 text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-2 text-sm font-medium">
                User Type
              </label>
              <select
                name="type"
                value={data.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1f1a17] border border-stone-700 text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c]"
              >
                <option value="">Select User Type</option>
                <option value="Renter">Renter</option>
                <option value="Owner">Owner</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#d6a85c] text-[#1f1a17] py-3 rounded-lg font-bold hover:bg-[#c5964b] transition duration-200 shadow-lg"
            >
              Sign Up
            </button>

            <div className="text-center text-stone-400 text-sm mt-4">
              Have an account?{" "}
              <Link
                to="/login"
                className="text-[#d6a85c] hover:text-[#c5964b] transition font-medium"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;