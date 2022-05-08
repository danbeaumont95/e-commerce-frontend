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

function App(props: any) {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/security" element={<Security />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
