import React from 'react'

const Hero = () => {
  return (
    <div className="heroContainer text-center bg-hero-pattern bg-no-repeat bg-center bg-cover h-96 flex flex-col items-center justify-start">
      <div className="mainInfo">
        <h2 className="text-3xl p-1 mt-5 mb-5 font-bold">
          Kids earn points for completing their chores! Test
        </h2>
      </div>
      <div className='secondInfo'>
        <h4 className="text-1xl font-bold p-1">
          Complete your chores to add points to your bank!
        </h4>
        <p className="p-1">
          Points earned can be used towards your wishlist items.
        </p>
      </div>
    </div>
  );
}

export default Hero