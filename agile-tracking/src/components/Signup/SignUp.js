import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './SignUp.css';  // ✅ Import CSS for styling

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/users', {
                name,
                email,
                password,
                role,
            });

            login(response.data);
            navigate('/');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className='signup'>
        <div className="signup-container">
            <h2 className='bi bi-pen'> Sign Up</h2>
            <form className="signup-form" onSubmit={handleSignUp}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Role:
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <button type="submit" className='btn btn-success'>Sign Up</button>
            </form>
            <button className="login-button" onClick={() => navigate('/login')}>Go to Login</button>
        </div>
        </div>
    );
};

export default SignUp;
