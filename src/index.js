import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import 'tw-elements'
import Layout from './components/Layout'
import HeroPage from './components/Hero'
import ChoresPage from './components/Chores'
import ChoresaddPage from './components/Choresadd'
import WishlistPage from './components/Wishlist'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));

function getBucksFromLocalStorage() {
  const points = localStorage.getItem('points');
  if (points) {
    return Number(points);
  }
  return 0;
};

const Main = () => {
  const [points, setPoints] = useState(() => getBucksFromLocalStorage());

  const addPoints = (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem('points', newPoints);
};

return(
  <App addPoints={addPoints}>
    <BrowserRouter basename="/chore-bucks">
      <Routes>
        <Route path="/" element={<Layout points={points}/>}>
          <Route path="" element={<HeroPage />} />
          <Route path="/chores" element={<ChoresPage />} />
          <Route path="/choresadd" element={<ChoresaddPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </App>
);
};

root.render(<Main />);
