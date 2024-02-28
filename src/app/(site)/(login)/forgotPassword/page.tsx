"use client"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormEvent, useReducer, useState } from 'react';
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const initialState = {
  userName: '',
  password: '',
  rememberMe: true,
  error: false,
  errorMessage: ''
}

const defaultLogin = {
  userName: 'riya@Collections.in',
  password: 'riya123'
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'userCredentials':
      return {
        ...state,
        [action.name]: [action.payload]
      }
    case 'error':
      return {
        ...state,
        error: action.payload,
        errorMessage: action.errorMessage
      }
  }
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showResend, setShowResend] = useState(false);

  const validateEmail = (e: any) => {
    if (email === "") return;
    if (!email.toLowerCase().match(emailRegex)) {
      setErrorMessage('**Please a valid Email address')
      return;
    }
    else {
      setErrorMessage('');
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email === "") {
      setErrorMessage('**Enter your registered Email');
    }
    else if (!email.toLowerCase().match(emailRegex)) {
      setErrorMessage('**Please a valid Email address');
    }
    else if (email !== "riya@collections.in") {
      setErrorMessage('**Entered Email address is not Registered!!')
    }
    else{
      setSuccessMessage('Otp Sent ✅ !! Please check your eMail');
      setShowResend(true);   
    }
    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username/Email"
              name="userName"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={validateEmail}
              autoFocus
            />
            <div className='flex justify-center'>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#1976d2' }}
                sx={{ mt: 3, mb: 2 }}
                className='hover:text-white font-bold w-3/4'
              >
                {`${showResend? 'Resend 📨' : 'Send OTP ✉️'}`}
              </Button>
            </div>
          </Box>
          <Grid className={`${errorMessage ? 'text-red-600' : 'text-green-600'} py-[1em] w-full`} item xs={12}>
            {errorMessage ? errorMessage : successMessage}
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}