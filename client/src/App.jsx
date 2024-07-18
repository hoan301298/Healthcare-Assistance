import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Home from './components/home/Home';
import Register from './components/account_service/Register';
import Login from './components/account_service/Login';
import SearchService from './components/search/SearchService';
import Navbar from './components/Navbar';
import Contact from './components/chat/Contact';
import ChatPage from './components/chat/ChatPage';
import Booking from './components/appointment/Booking';
import Account from './components/account_service/Account';

import './css/Navbar.css';
import './css/Chat.css';
import '././css/Form.css';
import '././css/App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  
  const updateToken = (newToken) => {
    setToken(newToken);
  }

  const authorization = async () =>{
    if(token === null) {
      localStorage.setItem('isAuthenticated', false);
      localStorage.setItem('username', null);
    } else {
      try {
        const response = await axios.get('/authenticated', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if(!response.status === 200) {
          throw new Error('Failed to fetch data')
        } else {
          localStorage.setItem('isAuthenticated', true)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  useEffect(() => {
    authorization();
    setTimeout(() => {
      setToken(null);
      localStorage.removeItem('accessToken');
      localStorage.setItem('isAuthenticated', false);
      localStorage.removeItem('selectedHospital');
      localStorage.removeItem('username');
      localStorage.removeItem('alertMessage');
    }, 10 * 60 * 1000);

  }, [updateToken, token]);
  
  return (
    <div className='banner'>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/map' element={<SearchService />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/chat' element={<ChatPage />}/>
          <Route path='/appointment' element={<Booking />}/>
          <Route path='/login' element={<Login updateToken={updateToken} />}/>
          <Route path='/sign-up' element={<Register updateToken={updateToken} />}/>
          <Route path='/account' element={<Account />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;