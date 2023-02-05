import React from "react";
import HeroImage from "../assets/chorebucks.png";

const Hero = () => {
  return (
    <main className="text-center bg-hero-pattern bg-no-repeat bg-center bg-cover bg-blue-300 flex flex-col items-center justify-start">
      <section className="mt-6 mb-6">
        <h2 className="text-md p-1 font-bold md:text-3xl lg:text-4xl">
          🚀 Kids earn points for completing chores! 🎉
        </h2>
        <h4 className="text-md p-1 md:text-lg lg:text-lg">
          Complete chores to add ChoreBucks to your bank!
        </h4>
      </section>
      <section>
        <img
          src={HeroImage}
          alt="Chore Bucks"
          className="mx-auto w-5/6 md:w-5/6 lg:w-5/6"
        />
      </section>
    </main>
  );
}

export default Hero