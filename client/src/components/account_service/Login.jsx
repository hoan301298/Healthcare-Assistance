import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ updateToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const navigate = new useNavigate();

  useEffect(() => {
    setAlertMessage(localStorage.getItem('alertMessage'));
  }, [])

  if(alertMessage === undefined) {
    setAlertMessage(null);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/login', { username, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('username', username);
        localStorage.setItem('isAuthenticated', true);
        updateToken(token);
        window.location.href = localStorage.getItem('backToPage') || '/';
      })
      .catch(error => {
        localStorage.removeItem('alertMessage');
        alert('Invalid username or password. Please try again.')
        console.error('Error to get data: ', error)
      })
  };

  const handleRegisterClick = () => {
    navigate('/sign-up');
  }

  return (

    <div className='login'>
      {isAuthenticated? (
        navigate(localStorage.getItem('backToPage') || '/account')
        ) : (
        <div>
          {alertMessage != null && (<p className='alert-message'>{alertMessage}</p>)}
          <form className='login-form' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="buttons">
              <button type="submit">Login</button>
              <button type="button" onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </form>
        </div>  
      )}
    </div>
  );
}

export default Login;