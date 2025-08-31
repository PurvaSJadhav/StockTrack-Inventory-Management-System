import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 p-2 text-center">
      <div className="container mx-auto flex flex-col items-center gap-1">
        <div className="flex space-x-6">
          <a
            href="https://github.com/PurvaSJadhav"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition"
          >
            <FaGithub size="1.2em" />
          </a>
          <a
            href="https://www.linkedin.com/in/purva-jadhav-2816pj/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition"
          >
            <FaLinkedin size="1.2em" />
          </a>
        </div>

        <div className="flex space-x-4 text-sm">
          <Link to="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-white transition">
            Terms of Service
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          &copy; {currentYear} StockTrack. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;