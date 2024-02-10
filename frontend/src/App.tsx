import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './layouts/homepage/Homepage';
import AccountInfoPage from './layouts/user/AccountInfoPage';
import ActivationForm from './layouts/user/ActivationForm';
import { AuthProvider } from './context/Context';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // update navbar state
  const updateNavbarState = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar isLoggedin={isLoggedIn} setIsLoggedin={setIsLoggedIn} />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/account' element={<AccountInfoPage />} />
            <Route path='/activate/:email/:activationCode' element={<ActivationForm updateNavbarState={updateNavbarState} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
