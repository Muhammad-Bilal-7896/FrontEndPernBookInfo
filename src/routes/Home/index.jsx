import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

//Importing Components
import Header from '../../components/Header';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Muhammad-Bilal-7896">
                Muhammad Bilal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Home = () => {
    const [merchants, setMerchants] = useState([]);

    useEffect(() => {
        console.log("The Merchants Full Data is: " + merchants);
    });

    useEffect(() => {
        getMerchant();
    }, [merchants]);

    function getMerchant() {
        fetch('http://localhost:3001/')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setMerchants(data);
            });
    }

    function createMerchant() {
        let name = prompt('Enter merchant name');
        let email = prompt('Enter merchant email');
        fetch('http://localhost:3001/merchants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getMerchant();
            });
    }

    function deleteMerchant() {
        let id = prompt('Enter merchant id');
        fetch(`http://localhost:3001/merchants/1`, {
            method: 'DELETE',
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getMerchant();
            });
    }

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        PERN STACK Application
                    </Typography>
                    <div>
                        <br />
                        <Button variant={"contained"} onClick={createMerchant}>Add merchant</Button>
                        <br />
                        <Button variant={"outlined"} color="error" onClick={deleteMerchant}>Delete merchant</Button>
                    </div>

                    <br />

                    <Copyright />
                </Box>
            </Container>
        </>
    );
}
export default Home;