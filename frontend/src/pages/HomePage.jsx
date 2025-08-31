import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main
        className="relative flex-grow flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 text-center text-white p-4">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
          >
            Welcome to StockTrack
          </h1>
          <p
            className="text-lg md:text-2xl mb-8"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}
          >
            Your simple solution for managing inventory.
          </p>
          <Link
            to="/inventory"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
