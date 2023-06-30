import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData} from './newsReciever';
import { Route, Routes } from 'react-router-dom';


import Business from "./LinkComponents/Business";
import Sports from "./LinkComponents/Sports";
import Politics from "./LinkComponents/Politics";
import Travel from "./LinkComponents/Travel";
import World from "./LinkComponents/World";
import MainPage from "./LinkComponents/MainPage";
import NewsPage from './LinkComponents/NewsPage';
import UserSearch from "./LinkComponents/UserSearch";


function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/business" element={<Business />} />
          <Route path="/politics" element={<Politics />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/world" element={<World />} />
          <Route path="/news/*" element={<NewsPage />} />
          <Route path="/user-search/:searchParam" element={<UserSearch />} />

        </Routes>
      <Footer />
    </div>
  );
}

export default App;


