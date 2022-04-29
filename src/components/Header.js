import React from 'react'
import AppLogo from '../assets/appLogo.png'
import { RiShoppingBasketLine } from "react-icons/ri";

const Header = () => {
  return (
    <div className='container flex justify-between mx-auto min-w-full pt-0.5 pb-0.5'>
      <div className='appLogo flex content-center'>
        <img src={AppLogo} alt='' className='pl-2'/>
        <h1 className='self-center'><span className='text-3xl text-blue-800 font-bold'>Chore</span><span className='text-3xl text-green-800 font-bold'>Bucks</span></h1>
      </div>
      <div className='shoppingBasket flex items-end'>
        <RiShoppingBasketLine className='text-5xl text-yellow-600' />
        <span className='pointsValue pr-2'>
          <p className='text-center font-semibold'>0</p>
          <p>Points</p>
        </span>
      </div>
    </div>
  )
}

export default Header