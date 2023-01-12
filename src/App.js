import React from 'react';
import Sidebar from './components/Sidebar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BugList from './pages/BugList';
import FishList from './pages/FishList';
import FossilList from './pages/FossilList';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bugs" element={<BugList />} />
          <Route path="/fish" element={<FishList />} />
          <Route path="/fossils" element={<FossilList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
