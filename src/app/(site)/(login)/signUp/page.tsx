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
import { InputAdornment } from '@mui/material';
import { FormEvent, useState, useReducer } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptPromotions: false,
  error: false,
  errorMessage: "",
  success: false,
  successMessage: "",
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'userDetails':
      return {
        ...state,
        [action.name]: action.payload
      }
    case 'password':
      return {
        ...state,
        [action.name]: action.payload
      }
    case 'acceptPromotions':
      return {
        ...state,
        [action.name]: action.payload
      }
    case 'error':
      return {
        ...state,
        error: action.payload,
        errorMessage: action.errorMessage
      }
    case 'success':
      return {
        ...state,
        success: action.payload,
        successMessage: action.successMessage
      }
    default:
      break;
  }
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { firstName, lastName, email, password,
    confirmPassword, errorMessage, successMessage, acceptPromotions } = state;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (firstName === "") {
      return dispatch({ type: 'error', payload: true, errorMessage: '**Please enter the FirstName' })
    }
    else if (lastName === "") {
      return dispatch({ type: 'error', payload: true, errorMessage: '**Please enter the LastName' })
    }
    else if (email === "") {
      return dispatch({ type: 'error', payload: true, errorMessage: '**Please enter your eMail address' })
    }
    else if (password === "") {
      return dispatch({ type: 'error', payload: true, errorMessage: '**Password field cannot be empty' })
    }
    else if (confirmPassword === "") {
      return dispatch({ type: 'error', payload: true, errorMessage: '**Password field cannot be empty' })
    }
    else {
      return dispatch({ type: 'error', payload: false, errorMessage: '' })
    }
  }

  const validateEmail = () => {
    debugger;
    if (!email.toLowerCase().match(emailRegex)) {
      return dispatch({ type: 'error', payload: true, errorMessage: '**Please a valid Email address' })
    }
    else {
      return dispatch({ type: 'error', payload: false, errorMessage: '' })
    }
  }

  const createPassword = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'password', payload: e.target.value, name: e.target.name })
    if (e.target.value.length < 5) {
      dispatch({ type: 'error', payload: true, errorMessage: '**Password length should have minimum 5 charaters' })
    }
    else {
      dispatch({ type: 'error', payload: false, errorMessage: "" })
    }
  }

  const matchPassword = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'password', payload: e.target.value, name: e.target.name })
    if (password !== e.target.value) {
      dispatch({ type: 'success', payload: false, successMessage: '' })
      return dispatch({ type: 'error', payload: true, errorMessage: '**Password Does not match ❌' })
    }
    else {
      dispatch({ type: 'error', payload: false, errorMessage: '' })
      return dispatch({ type: 'success', payload: true, successMessage: 'Password Matched ✅' })
    }
  }

  const clearValidation = () => {
    if (successMessage !== "") {
      dispatch({ type: 'success', payload: false, successMessage: '' })
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className='signUpArea flex flex-col justify-between' component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='flex justify-center flex-wrap items-center'>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </div>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={e => dispatch({ type: 'userDetails', payload: e.target.value, name: e.target.name })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={e => dispatch({ type: 'userDetails', payload: e.target.value, name: e.target.name })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type='email'
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => dispatch({ type: 'userDetails', payload: e.target.value, name: e.target.name })}
                  onBlur={validateEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={e => createPassword(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={confirmPassword}
                  InputProps={{
                    endAdornment: <InputAdornment
                      position="end"
                      onClick={() => setShowPassword((show) => !show)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </InputAdornment>,
                  }}
                  autoComplete="new-password"
                  onChange={e => matchPassword(e)}
                  onBlur={clearValidation}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox
                    value={acceptPromotions}
                    color="primary"
                    name='acceptPromotions'
                    onChange={e => dispatch({ type: 'acceptPromotions', payload: e.target.checked })}
                  />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <div className='flex justify-center'>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#1976d2' }}
                sx={{ mt: 3, mb: 2 }}
                className='hover:text-white font-bold w-3/4'
              >
                Sign Up
              </Button>
            </div>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Grid className={`${state.error ? 'text-red-600 py-[1em]' : 'text-green-600 py-[1em]'} w-full`} item xs={12}>
            {state.error ? errorMessage : successMessage}
          </Grid>
        </Box>
        <Copyright sx={{ mb: 5 }} />
      </Container>
    </ThemeProvider>
  );
}