import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: ['Avenir Heavy Oblique', 'Arial', 'sans serif'],
    fontSize: '2.5rem',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  subtitle: {
    flexGrow: 1,
    fontFamily: ['Avenir Medium', 'Arial', 'sans serif'],
  },
  links: {
    textDecoration: 'none',
    color: 'white',
    width: '5%',
    flexWrap: 'wrap',
    position: 'relative',

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#AA3A21',
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#fff',
    width: '10rem',
    height: '2.5rem',
    '&:hover': {
      backgroundColor: '#AA3A21',
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ background: '#AA3A21', boxShadow: 'none' }}>
        <Toolbar>
          <Typography id ="TopNav1" variant="h5" className={classes.title}>
            <a href="#MainPage" className={classes.links}>
              Optimum DigiBank
            </a>
          </Typography>

          <Typography id ="TopNav2" className={classes.subtitle}>
            <a href="#AboutUs" className={classes.links}>
              About Us
            </a>
          </Typography>
          <Typography id ="TopNav3" className={classes.subtitle}>
            <a href="#PersonalBanking" className={classes.links}>
              Personal Banking
            </a>
          </Typography>
          <Typography id ="TopNav4" className={classes.subtitle}>
            <a href="#FAQ" className={classes.links}>
              FAQ
            </a>
          </Typography>
          <Typography id ="TopNav5" className={classes.subtitle}>
            <a href="#ContactUs" className={classes.links}>
              Contact Us
            </a>
          </Typography>

          <Button className={classes.submit} href="/Login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
