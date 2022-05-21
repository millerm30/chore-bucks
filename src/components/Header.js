import React from 'react'
import AppLogo from '../assets/appLogo.png'
import { RiMoneyDollarCircleLine } from "react-icons/ri"

const Header = () => {
  return (
    <div className='headerContainer container flex justify-between mx-auto min-w-full pt-0.5 pb-0.5 bg-gray-100'>
      <div className='appLogo flex content-center'>
        <img src={AppLogo} alt='' className='hidden w-24 md:block pl-2'/>
        <h1 className='self-center'><span className='text-3xl text-blue-800 font-bold'>Chore</span><span className='text-3xl text-green-800 font-bold'>Bucks</span></h1>
      </div>
      <div className='shoppingBasket flex flex-col items-center'>
        <RiMoneyDollarCircleLine className='text-4xl text-yellow-600 pr-2' />
        <span className='pointsValue pr-2'>
          <p className='text-center font-semibold'>0</p>
          <p>Points</p>
        </span>
      </div>
    </div>
  )
}

export default Header