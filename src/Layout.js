import React from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout