import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const Scroll = () => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScroll(true)
    } else {
      setShowScroll(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-5 bg-blue-300">
      {showScroll ? (
        <FaArrowUp
          className="mx-auto text-3xl animate-bounce cursor-pointer bg-white rounded-full p-2"
          onClick={scrollToTop}
        />
      ) : null}
    </section>
  );
}

export default Scroll