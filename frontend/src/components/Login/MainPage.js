// MainPage.js, ProductHero.js
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MainPageLayout from './MainPageLayout';

const styles = (theme) => ({
  background: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/bank1.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  button: {
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
  title: {
    marginBottom: theme.spacing(5),
    fontWeight: 700,
  },
  subtitle: {
    marginBottom: theme.spacing(15),
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function MainPage(props) {
  const { classes } = props;

  return (
    <MainPageLayout backgroundClassName={classes.background}>
      <Typography id ="MainPage1" variant="h2" marked="center" className={classes.title} component="h2">
        Choose the right bank today
      </Typography>
      <Typography id ="MainPage2" variant="h5" component="h5" align="center">
        <div>
          We craft the best possibilities for you.
          <br />
          Optimum Digital Bank prioritises in optimising your experiences.
          <br />
          We will place the best opportunities into your finger tips.
        </div>
      </Typography>
      <Button
        className={classes.button}
        href="/Login"
      >
        JOIN TODAY
      </Button>

    </MainPageLayout>
  );
}

MainPage.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(MainPage);
