import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <div className="flex justify-center space-x-6 text-lg">
          <a
            href="#"
            className="hover:text-gray-800 dark:hover:text-white transition"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="hover:text-gray-800 dark:hover:text-white transition"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="hover:text-gray-800 dark:hover:text-white transition"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="hover:text-gray-800 dark:hover:text-white transition"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        
        <p className="text-sm">&copy; 2024 Fiverr. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
