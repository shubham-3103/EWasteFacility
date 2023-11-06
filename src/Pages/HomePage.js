import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import '../App.css';
import Dashboard from './Dashboard';

function HomePage() {
  
  return (
    <>
      <div>
          <Navbar />
          <Dashboard />
      </div>
    </>
  )
}

export default HomePage