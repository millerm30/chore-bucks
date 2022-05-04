import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import 'tw-elements'
import Layout from './Layout'
import HeroPage from './routes/HeroPage'
import ChoresPage from './routes/ChoresPage'
import ChoresaddPage from './routes/ChoresaddPage'

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
