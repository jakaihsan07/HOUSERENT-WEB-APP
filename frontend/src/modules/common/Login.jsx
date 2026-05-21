import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
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

    if (!data.email || !data.password) {
      showToast("error", "Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8001/api/user/login",
        data,
        { withCredentials: true }
      );

      if (res.data.success) {
        showToast("success", res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        const user = res.data.user;

        setTimeout(() => {
          if (user.type === "Admin") {
            navigate("/admin");
          } else if (user.type === "Renter") {
            navigate("/renter");
          } else if (user.type === "Owner") {
            if (user.granted === "ungranted") {
              showToast("error", "Your account is not yet confirmed by the admin");
            } else {
              navigate("/owner");
            }
          } else {
            navigate("/login");
          }
        }, 1000);
      } else {
        showToast("error", res.data.message);
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || "Login failed");
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
            className="text-[#d6a85c] transition font-medium"
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

      {/* Login Form */}
      <div className="flex-grow flex justify-center items-center px-4 pt-24">
        <div className="w-full max-w-md bg-[#2b221d]/95 border border-[#d6a85c]/20 backdrop-blur-md shadow-2xl rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#d6a85c]/15 text-[#d6a85c] text-3xl font-bold shadow-inner border border-[#d6a85c]/30">
              🔐
            </div>

            <h1 className="text-3xl font-bold mt-5 text-stone-100">
              Welcome Back
            </h1>

            <p className="text-stone-400 mt-2">
              Sign in to continue managing your rental journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-[#1f1a17] border border-stone-700 text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#d6a85c] text-[#1f1a17] py-3 rounded-lg font-bold hover:bg-[#c5964b] transition duration-200 shadow-lg"
            >
              Sign In
            </button>

            <div className="flex justify-between text-sm mt-4">
              <Link
                to="/forgot-password"
                className="text-stone-400 hover:text-[#d6a85c] transition"
              >
                Forgot Password?
              </Link>

              <Link
                to="/register"
                className="text-[#d6a85c] hover:text-[#c5964b] transition font-medium"
              >
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;