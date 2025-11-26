import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BiEnvelope, BiPhoneIncoming } from "react-icons/bi";
import { FaMapMarked } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-b from-white to-blue-50 flex flex-col items-center py-12 px-6 font-[Poppins]">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4 text-center">
          Contact <span className="text-gray-500">Us</span>
        </h1>

        <p className="text-gray-600 mb-10 text-center max-w-xl">
          Have a question, feedback, or partnership idea? We’d love to hear from you.  
          Our team will get back to you as soon as possible.
        </p>

        <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
          {/* Contact Form */}
          <form className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send us a Message
            </h2>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-radial from-gray-900 to-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-xl w-full transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-linear-to-b from-gray-900 to-gray-600 text-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

            <div className="flex items-center mb-5">
              <BiPhoneIncoming className="w-5 h-5 mr-4" />
              <p>+91 98765 43210</p>
            </div>

            <div className="flex items-center mb-5">
              <BiEnvelope className="w-5 h-5 mr-4" />
              <p>support@bookstore.in</p>
            </div>

            <div className="flex items-center mb-5">
              <FaMapMarked className="w-5 h-5 mr-4" />
              <p>BookStore HQ, Kochi, Kerala, India</p>
            </div>

            <p className="mt-8 text-sm text-blue-100">
              Available Mon–Sat, 9:00 AM – 7:00 PM
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
