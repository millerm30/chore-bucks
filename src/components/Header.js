import React from 'react'
import AppLogo from '../assets/appLogo.png'
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const Header = () => {
  return (
    <div className='headerContent container flex justify-between mx-auto min-w-full pt-0.5 pb-0.5 bg-gray-100'>
      <div className='appLogo flex content-center'>
        <img src={AppLogo} alt='' className='hidden md:block pl-2'/>
        <h1 className='self-center'><span className='text-3xl text-blue-800 font-bold'>Chore</span><span className='text-3xl text-green-800 font-bold'>Bucks</span></h1>
        <div className='mt-2 ml-4 w-2 h-6 border-2 border-b-gray-900 border-t-red-700 border-l-yellow-600 border-r-green-600 rounded-full animate-spin'></div>
      </div>
      <div className='shoppingBasket flex items-start'>
        <RiMoneyDollarCircleLine className='text-5xl text-yellow-600' />
        <span className='pointsValue pr-2'>
          <p className='text-center font-semibold'>0</p>
          <p>Points</p>
        </span>
      </div>
      
    </div>
  )
}

export default Header