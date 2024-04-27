import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = ({ updateToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    setAlertMessage(localStorage.getItem('alertMessage'));
  }, [])

  if(alertMessage === undefined) {
    setAlertMessage(null);
  }
  
  console.log(alertMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/login', { username, password})
      .then(response => {
        const data = response.data;
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('username', username);
        localStorage.removeItem('alertMessage');
        updateToken(data.token);
        window.location.href = localStorage.getItem('backToPage') || '/account';
      })
      .catch(error => {
        alert('Invalid username or password. Please try again.')
        console.error('Error to get data: ', error)
      })
  };

  const handleRegisterClick = () => {
    window.location.href = '/sign-up';
  }

  return (

    <div className='login'>
      {isAuthenticated? (
        window.location.href = localStorage.getItem('backToPage')
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