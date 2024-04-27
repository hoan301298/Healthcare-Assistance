import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIO from 'socket.io-client';
import RedirectToLoginPage from '../account_service/RedirectToLoginPage';
let keyUser;
let socket;

const Contact = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const saveUserName = (userName) => {
    const key = 'username_' + Date.now();
    localStorage.setItem(key, userName);
    return key;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    keyUser = saveUserName(userName);  
    navigate('/chat');
    try {
      socket = socketIO.connect('http://localhost:5000');
    } catch (e) {
      console.error('Error to connect socketIO:', e);
    }
  };
  return (
    <div>
      {isAuthenticated? (
        <form className="home__container" onSubmit={handleSubmit}>
        <h2 className="home__header">Sign in to Open Chat</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          minLength={6}
          name="username"
          id="username"
          className="username__input"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <button className="home__cta">SIGN IN</button>
      </form>                
      ) : (
        <RedirectToLoginPage pathname={window.location.pathname} alertMessage={'Please login to use chat service!'}/>
      )}
    </div>
  );
};

export {Contact, keyUser, socket};