import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/login`, { username, password });
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container>
            <h1 className='text-center text-3xl py-4'>Please login to continue</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <TextField label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </Container>
    );
};

export default Login;
