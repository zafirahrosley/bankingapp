import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/images/loginPic.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'absolute',
  },
  links: {
    textDecoration: 'none',
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#173A77',
    fontWeight: '700',
    fontSize: '1.5rem',
  },
  deselect: {
    textDecoration: 'none',
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#606E87',
    fontWeight: '700',
    fontSize: '1.5rem',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#AA3A21',
    fontSize: '2.5rem',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: 'black',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#AA3A21',
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#fff',
    '&:hover': {
      backgroundColor: '#AA3A21',
    },
  },
  forgetButton: {
    color: 'black',
    fontStyle: 'bold',
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfmPassword, setCnfmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorEmail, setEmailError] = useState(false);

  const registerUser = (e) => {
    e.preventDefault();
    if (cnfmPassword !== password) {
      return;
    }
    //mongodb+srv://optimum-leads:12345@optimumbatch7-1rg4n.mongodb.net/bankappphase2?retryWrites=true&w=majority
    axios.post('https://bankapp-backend.herokuapp.com/users/register', {
      name,
      email,
      password,
    })
      .then((res) => {
        if (res.data.message === 'register success') {
          window.location.href = '/SignUpResult';
        }
        if (res.data.message === 'Email already exist!') {
          setEmailError(true);
        }
      })
      .catch(() => {
        alert('Registration failed Please call out frontdesk');
      });
  };

  useEffect(() => {
    (cnfmPassword !== password) ? setError(true) : setError(false);
  }, [cnfmPassword, password]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <a href="/" className={classes.link}>
            <h1 className={classes.title}>Optimum DigiBank</h1>
          </a>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Box p={5}>
              <a href="/Login" className={classes.deselect}>LOGIN</a>
            </Box>
            <Box p={5}>
              <a href="/SignUp" className={classes.links}>REGISTER</a>
            </Box>
          </Box>
          <form className={classes.form} onSubmit={registerUser}>
            <TextField
              inputProps={{ pattern: '[A-Za-z ]+', title: 'Letters characters only' }}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              InputLabelProps={{
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100%',
                  color: '#173A77',
                },
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              name="email"
              label="Email Address"
              id="email"
              autoComplete="email"
              InputLabelProps={{
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100%',
                  color: '#173A77',
                },
              }}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}

              error={!!errorEmail}
              helperText={errorEmail ? 'Email already registered! Please try a different email' : ''}
            />
            <TextField
              inputProps={{ pattern: '(?=.*[A-Za-z]).{6,}', title: 'More than 6 Character Alphanumeric character only allowed!' }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100%',
                  color: '#173A77',
                },
              }}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              error={!!error}
              helperText={error ? 'Password not the same' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="retype"
              label="Retype Password"
              id="retype"
              type="password"
              autoComplete="current-password"
              InputLabelProps={{
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100%',
                  color: '#173A77',
                },
              }}
              onChange={(e) => {
                setCnfmPassword(e.target.value);
              }}
              helperText={error ? 'Password not the same' : ''}
              error={!!error}
            />
            <div align="center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
