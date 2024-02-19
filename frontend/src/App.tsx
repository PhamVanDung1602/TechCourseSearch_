import React, {useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './layouts/homepage/Homepage';
import AccountInfoPage from './layouts/user/AccountInfoPage';
import { AuthProvider } from './context/Context';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/account' element={<AccountInfoPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;