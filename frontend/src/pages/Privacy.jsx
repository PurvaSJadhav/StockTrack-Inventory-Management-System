import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow container mx-auto p-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-6">Last updated: August 31, 2025</p>

          <div className="prose max-w-none">
            <p>
              Welcome to StockTrack. We are committed to protecting your
              personal information and your right to privacy. If you have any
              questions or concerns about this privacy notice, or our practices
              with regards to your personal information, please contact us.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              1. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when you register on the application, express an interest in
              obtaining information about us or our products and services, or
              otherwise when you contact us. The personal information that we
              collect depends on the context of your interactions with us and
              the application, but may include the following: Name, Email
              Address, and Password.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              2. How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our application for a
              variety of business purposes described below. These purposes
              include: to facilitate account creation and logon process, to
              manage user accounts, and to protect our services.
            </p>

            <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
              <p className="font-bold">Disclaimer:</p>
              <p>
                This is a template privacy policy. You should consult with a
                legal professional to ensure it meets the specific needs and
                legal requirements of your application.
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                to="/"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 mt-8"
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
