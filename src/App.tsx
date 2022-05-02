import React from 'react';
import './App.css';
import Main from './Components/Main';
import NavBar from './Components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/navbar" element={<NavBar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
