import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import p1 from "../../images/p1.jpg";
import p2 from "../../images/p2.jpg";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";
import AllPropertiesCards from "../user/AllPropertiesCards";

const images = [p1, p2, p3, p4];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1f1a17]">
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

      {/* Hero Section */}
      <div className="relative w-full h-[75vh] mt-16 overflow-hidden">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              currentIndex === idx ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a17]/95 via-[#1f1a17]/65 to-transparent"></div>
          </div>
        ))}

        {/* Hero Text */}
        <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 max-w-2xl text-stone-100 px-4">
          <p className="text-[#d6a85c] font-bold tracking-[0.25em] uppercase mb-4">
            Cozy House Rental
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            Find a Warm and Comfortable Place to Stay
          </h1>

          <p className="text-lg md:text-xl text-stone-300 mb-8 leading-relaxed">
            Discover trusted rental homes with a simple, calm, and elegant
            experience for renters and property owners.
          </p>

          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-[#d6a85c] text-[#1f1a17] px-7 py-3 rounded-lg font-semibold hover:bg-[#c5964b] transition shadow-lg"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="bg-transparent text-[#d6a85c] px-7 py-3 rounded-lg font-semibold border border-[#d6a85c]/60 hover:bg-[#d6a85c] hover:text-[#1f1a17] transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-20 flex space-x-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "bg-[#d6a85c] scale-125 shadow-lg"
                  : "bg-stone-400 hover:bg-[#d6a85c]"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto w-full py-20 px-6">
        <div className="text-center mb-16">
          <p className="text-[#d6a85c] font-bold tracking-[0.25em] uppercase mb-3">
            Featured Homes
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-100 mb-6">
            Explore Available Rental Properties
          </h1>

          <p className="text-stone-300 font-medium text-lg max-w-2xl mx-auto">
            Looking to post your property?
            <Link
              to="/register"
              className="ml-2 px-5 py-2 bg-[#d6a85c] text-[#1f1a17] rounded-lg hover:bg-[#c5964b] transition duration-300 font-semibold"
            >
              Register as Owner
            </Link>
          </p>
        </div>

        {/* Property Cards */}
        <div className="mt-12">
          <AllPropertiesCards />
        </div>
      </div>
    </div>
  );
};

export default Home;