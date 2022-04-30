import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'tw-elements';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Hero />
    <Footer />
  </React.StrictMode>
);
