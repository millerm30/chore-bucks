import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Navigation from './Navigation'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
}

export default Layout