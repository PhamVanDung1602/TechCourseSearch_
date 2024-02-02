import React from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './layouts/homepage/Homepage';
import AccountInfoPage from './layouts/user/AccountInfoPage';
import ActivationForm from './layouts/user/ActivationForm';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/account' element={<AccountInfoPage />} />
          <Route path='/activate/:email/:activationCode' element={<ActivationForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
