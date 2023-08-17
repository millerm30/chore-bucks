import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full h-14">
      <div className="text-center lg:text-left bg-gray-100 text-gray-600 h-14">
        <div className="flex justify-center items-center md:justify-between lg:justify-between p-6 border-t border-gray-300 h-14">
          <div className="mr-12 hidden md:block lg:block">
            <span>&copy;2023, Designed By Michael Miller</span>
          </div>
          <div className="flex justify-center">
            <Link to="/contact">
              <MdAlternateEmail className="text-3xl mr-6 text-gray-600 hover:scale-150 transition duration-700" />
            </Link>
            <a
              href="http://www.facebook.com/millerm30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-3xl mr-6 text-gray-600 hover:scale-150 transition duration-700" />
            </a>
            <a
              href="http://www.twitter.com/millerm30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-3xl mr-6 text-gray-600 hover:scale-150 transition duration-700" />
            </a>
            <a
              href="http://www.instagram.com/millergm302022"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-3xl mr-6 text-gray-600 hover:scale-150 transition duration-700" />
            </a>
            <a
              href="http://linkedin.com/in/michael-miller-0aa2bb229"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-3xl mr-6 text-gray-600 hover:scale-150 transition duration-700" />
            </a>
            <a
              href="http://www.github.com/millerm30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-3xl mr-6 text-gray-600 hover:scale-150 transition duration-700" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer