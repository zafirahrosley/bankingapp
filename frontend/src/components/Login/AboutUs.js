// AboutUs.js
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import "animate.css";

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#173A77',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(5),
    fontWeight: 700,
  },
  subtitle: {
    marginBottom: theme.spacing(15),
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
});

function AboutUs(props) {
  const { classes } = props;

  return (
    <section className={classes.root} id="AboutUs">
      <Container id="AboutUs1" className={classes.container}>
        <Typography id="AboutUs2" variant="h2" marked="center" className={classes.title} component="h2">About Us</Typography>
        <Typography id="AboutUs3" variant="h4" marked="center" className={classes.subtitle} component="h2">
          Everyone wants the best, Optimum believes you deserves nothing less.
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <Typography id="AboutUs4" variant="h6" align="left" className="animate__animated animate__bounce">
                  Optimum has over 120 years of experience in Banking and
                  every generation In South East Asia knows about optimum.
                  We make the best effort for you,
                  and we are in the business of creating.
                  With more than 10,000 Employees and in all markets in South East Asia,
                  we provide excellent services for everyone who trusts Optimum.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <Typography id="AboutUs5" variant="h6" align="left">
                  <div>
                    As the leading banking services in South East Asia,
                    we ensure your investments are in responsible hands.
                    Every foresight and insights were made and executed especially for you.
                    <br />
                    We go further than what is needed,
                    with experiences and specialties in commodities,
                    investments, and services because we value what you truly value.
                  </div>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

AboutUs.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(AboutUs);
