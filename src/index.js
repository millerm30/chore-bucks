import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import 'tw-elements';
import Header from './components/Header';
import Navigation from './components/Navigation'
import Footer from './components/Footer';
import Hero from './components/Hero';
import Chores from './components/Chores'
import Choresadd from './components/Choresadd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="hero" element={<Hero />} />
          <Route path="chores" element={<Chores />} />
          <Route path="choresadd" element={<Choresadd />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>
);
