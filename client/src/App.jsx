import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';

import Home from './components/home_page/Home';
import Register from './components/account_service/Register';
import Login from './components/account_service/Login';
import SearchService from './components/map/SearchService';
import Navbar from './components/Navbar';
import Contact from './components/chat/Contact';
import ChatPage from './components/chat/ChatPage';
import Booking from './components/appointment/Booking';
import Account from './components/account_service/Account';

import './css/Navbar.css';
import './css/Chat.css';
import '././css/Form.css'

function App() {
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const location = useLocation();
  
  const updateToken = (newToken) => {
    setToken(newToken);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(token === null) {
          throw new Error('No token found!')  
        }

        const response = await axios.get('/authenticated', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if(!response.status == 200) {
          throw new Error('Failed to fetch data')
        }
        setData(response.data);
        setIsAuthenticated(true);
        console.log(data);
        console.log(isAuthenticated);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    setTimeout(() => {
      localStorage.removeItem('accessToken');
      setToken(null);
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', isAuthenticated);
      localStorage.removeItem('selectedHospital');
      localStorage.removeItem('username');
      localStorage.removeItem('alertMessage');
    }, 10 * 60 * 1000);

  }, [updateToken]);
  
  return (
    <div>
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