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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userName, password, rememberMe, error, errorMessage } = state;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(userName[0], '111', defaultLogin.userName, '222', password[0], defaultLogin.password);

    if (userName[0] !== defaultLogin.userName && password[0] !== defaultLogin.password) {
      dispatch({ type: 'error', payload: true, errorMessage: 'Please enter a valid credentials' })
    }
    else {
      dispatch({ type: 'error', payload: false, errorMessage: '' })
    }

    setTimeout(() => {
      dispatch({ type: 'error', payload: false, errorMessage: '' })
    }, 3000)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
              onChange={e => dispatch({ type: 'userCredentials', payload: e.target.value, name: e.target.name })}
              autoFocus
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              InputProps={{
                endAdornment: <InputAdornment
                  position="end"
                  className='cursor-pointer'
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>,
              }}
              autoComplete="new-password"
              onChange={e => dispatch({ type: 'userCredentials', payload: e.target.value, name: e.target.name })}
            />
            <FormControlLabel
              control={<Checkbox
                value="remember"
                color="primary"
                onChange={e => dispatch({ type: 'userCredentials', payload: e.target.value, name: e.target.name })}
              />}
              label="Remember me"
            />
            <div className='flex justify-center'>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{backgroundColor: '#1976d2'}}
                sx={{ mt: 3, mb: 2 }}
                className='hover:text-white font-bold w-3/4'
              >
                Sign In
              </Button>
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Grid className={'text-red-600 py-[1em] w-full'} item xs={12}>
            {error ? errorMessage : ''}
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}