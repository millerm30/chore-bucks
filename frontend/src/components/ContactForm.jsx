import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from "react-hot-toast";

const ContactForm = () => {
  const [ inputs, setInputs ] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [ status, setStatus ] = useState('Submit');
  const [ errors, setErrors ] = useState({});

  const { name, email, message } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  };

  const validate = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = toast.error(errors.name = "Name is required");
    }
    if (!email) {
      newErrors.email = toast.error(errors.email = "Email is required");
    }
    if (!message) {
      newErrors.message = toast.error(errors.message = "Message is required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validate()) {
        setStatus("Sending...");
        const { name, email, message } = inputs;
        let details = {
          name,
          email,
          message,
        };
        let response = await fetch("http://localhost:3001/contact/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            token: localStorage.token,
          },
          body: JSON.stringify(details),
        });
        setStatus("Submit");
        setInputs({
          name: "",
          email: "",
          message: "",
        });
        let result = await response.json();
        toast.success(result.status + ", Thanks for contacting us!📧");
      }
    };


  return (
    <main className="bg-blue-300">
      <section className="container mx-auto pt-10">
      <h1 className="text-3xl font-semibold p-1 text-center">Contact Us</h1>
      <form className="flex flex-col w-3/4 mx-auto md:w-1/3" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label
            className="text-sm font-semibold text-gray-600 mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="rounded-md py-2 px-2 border border-blue-700 outline-none w-full mb-2"
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            placeholder="Enter your name..."
          />
          <label
            className="text-sm font-semibold text-gray-600 mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="rounded-md py-2 px-2 border border-blue-700 outline-none w-full mb-2"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            placeholder="Enter your email..."
          />
          <label
            className="text-sm font-semibold text-gray-600 mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="rounded-md py-2 px-2 border border-blue-700 outline-none w-full mb-2 resize-none"
            name="message"
            value={message}
            onChange={(e) => onChange(e)}
            rows="5"
            placeholder="Enter your message..."
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-900 my-4 px-4 py-2 text-white font-bold rounded-lg"
            type="submit"
          >
            {status}
          </motion.button>
        </div>
      </form>
      </section>
    </main>
  );
};

export default ContactForm