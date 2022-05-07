import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import 'tw-elements'
import Layout from './Layout'
import HeroPage from './components/Hero'
import ChoresPage from './components/Chores'
import ChoresaddPage from './components/Choresadd'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path='' element={<HeroPage />} />
        <Route path='/chores' element={<ChoresPage />} />
        <Route path='/choresadd' element={<ChoresaddPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
