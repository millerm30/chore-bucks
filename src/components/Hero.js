import React from 'react'
import { DiBitbucket } from 'react-icons/di'

const Hero = () => {
  return (
    <div className='heroContent text-center bg-hero-pattern bg-no-repeat bg-center bg-cover h-96'>
      <div className='appInfo pt-10'>
        <h2 className='text-2xl font-semibold p-1'>Kids earn points for completing chores!</h2>
        <h4 className='text-1xl font-bold p-1'>Complete your chore to add points to your bank!</h4>
        <p className='p-1'>Each point earned will value .25&#162; Maximum of 10 points per chore.</p>
        <p className='p-1'>Drop completed chores into your bucket</p>
      </div>
      <div className='myForm pt-5'>
        <form className='flex flex-col w-1/3 mx-auto'>
          <label for='chores' className='mb-3'>Choose your chore: </label>
          <select name='chores' className='rounded-md py-2 border border-blue-700 rounded outline-none'>
            <option value='/' default>Choose Your Chore</option>
            <option value='Feed Pet'>Feed Family Pet</option>
            <option value='Make Bed'>Make Bed</option>
            <option value='Fold Laundry'>Fold Laundry</option>
            <option value='Wash Dishes'>Wash Dishes</option>
            <option value='Empty Dishwasher'>Empty Dishwasher</option>
            <option value='Clean Room'>Clean Bedroom</option>
          </select>
        </form>
          <button className='btnSubmit mt-5 bg-blue-400 hover:bg-blue-500 text-black font-bold py-2 px-4 border border-blue-700 rounded '>Add Chore</button>
        <div className='bucket flex justify-end'>
            <DiBitbucket className='text-8xl text-orange-600'/>
        </div>
      </div>
    </div>
  );
}

export default Hero