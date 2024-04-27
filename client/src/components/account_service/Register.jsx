import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ updateToken }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [token, setToken] = useState(null);
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/register', {
            username,
            password,
            email,
            phone,
            age
        })
            .then(response => {
                const data = response.data;
                setToken(data.token);
                updateToken(token);
                localStorage.setItem('accessToken', token);
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('username', username);
                window.location.href = localStorage.getItem('backToPage') || '/account';
            })
            .catch((error) => {
                alert('Invalid username or password. Please try again.')
                console.error('Error to get data: ', error)
        })
        alert('Invalid username or password!')
    };

    const handleLoginClick = () => {
        window.location.href = '/login'
    }

    return (
        <div>
            {isAuthenticated? (
                window.location.href = '/account'
            ) : (
                
                <div className='register'>
                    {}
                    <form className='register-form' onSubmit={handleSubmit}>
                        <h2>Register</h2>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required />
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder='Age' required />
                        <div className="buttons">
                            <button type="submit">Sign Up</button>
                            <button type="button" onClick={handleLoginClick}>Login</button>
                        </div>
                    </form>
                </div>
            )}    
        </div>
    );
}

export default Register;