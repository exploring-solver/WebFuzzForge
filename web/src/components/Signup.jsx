import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${backendUrl}/signup`, { username, password });
            alert('User signed up successfully');
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <Container>
            <h1 className='text-center text-3xl py-4'>Signup</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <TextField label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">Signup</Button>
            </form>
        </Container>
    );
};

export default Signup;
