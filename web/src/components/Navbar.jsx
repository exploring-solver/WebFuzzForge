import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

const Navbar = ({ token, setToken }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Empty div with flex-grow to push buttons to the right */}
                <div style={{ flexGrow: 1, fontWeight: 'bold' }}>WebFuzzForge</div>
                {token ? (
                    <>
                        <Button color="inherit" href="/dashboard">Dashboard</Button>
                        <Button color="inherit" href="/dold">Directory Fuzzer</Button>
                        <Button color="inherit" href="/analytics">Analytics</Button>
                        <Button color="inherit" href="/community">Community Forums</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" href="/login">Login</Button>
                        <Button color="inherit" href="/signup">Signup</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};



export default Navbar;
