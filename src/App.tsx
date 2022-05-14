import React from 'react';
import './App.css';
import Main from './Components/Main';
import NavBar from './Components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Basket from './Components/Basket';
import Account from './Components/Account';
import Security from './Components/Security';
import Addresses from './Components/Addresses';
import Home from './Components/Home';

function App(props: any) {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/account" element={<Account />} />
        <Route path="/home" element={<Home />} />

        <Route path="/account/security" element={<Security />} />
        <Route path="/account/addresses" element={<Addresses />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
