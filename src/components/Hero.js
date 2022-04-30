import React from 'react'

const Hero = () => {
  return (
    <div className="heroContent text-center bg-hero-pattern bg-no-repeat bg-center bg-cover h-96">
      <div className="appInfo pt-10">
        <h2 className="text-2xl font-semibold p-1">
          Kids earn points for completing chores!
        </h2>
        <h4 className="text-1xl font-bold p-1">
          Complete your chore to add points to your bank!
        </h4>
        <p className="p-1">
          Each point earned will value .25&#162; Maximum of 10 points per chore.
        </p>
      </div>
    </div>
  );
}

export default Hero