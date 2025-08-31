import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-500 mb-6">Last updated: August 31, 2025</p>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mt-6">
              1. Agreement to Terms
            </h2>
            <p>
              By using our application, StockTrack, you agree to be bound by
              these Terms of Service. If you do not agree to these terms, please
              do not use the application.
            </p>

            <h2 className="text-xl font-semibold mt-6">2. User Accounts</h2>
            <p>
              To use certain features of the application, you must register for
              an account. You agree to provide accurate, current, and complete
              information during the registration process and to update such
              information to keep it accurate, current, and complete. You are
              responsible for safeguarding your password.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              3. Limitation of Liability
            </h2>
            <p>
              In no event will we or our directors, employees, or agents be
              liable to you or any third party for any direct, indirect,
              consequential, exemplary, incidental, special, or punitive damages
              arising from your use of the application.
            </p>

            <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
              <p className="font-bold">Disclaimer:</p>
              <p>
                This is a template for Terms of Service. You should consult with
                a legal professional to customize it for your specific
                situation.
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

export default TermsOfService;
