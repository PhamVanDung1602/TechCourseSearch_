import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './layouts/homepage/Homepage';
import AccountInfoPage from './layouts/user/AccountInfoPage';
import { LoginStateProvider } from './context/LoginState';
import { PageStateProvider } from './context/PageState';
import { Provider } from 'react-redux';
import React from 'react';
import { persistor, store } from './redux/UserPersistConfig';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateUserRoute from './context/PrivateRoute';


function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PageStateProvider>
              <LoginStateProvider>
                <BrowserRouter>
                  <Navbar />
                  <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/' element={<PrivateUserRoute />}>
                      <Route path="/account/*" element={<AccountInfoPage />} />
                    </Route>
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </LoginStateProvider>
            </PageStateProvider>
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;