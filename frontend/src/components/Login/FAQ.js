// FAQ.js, ProductValues.js
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#E5E8ED',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#173A77',
  },
  qns: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  ans: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(5),
    fontWeight: 700,
  },
});

function FAQ(props) {
  const { classes } = props;

  return (
    <section className={classes.root} id="FAQ">
      <Container className={classes.container}>
        <Typography id ="FAQ1" variant="h2" marked="center" className={classes.title} component="h2">
          Frequently Asked Questions
        </Typography>
        <Grid>
          <Typography id ="FAQ2" variant="h5" component="h5" align="left" className={classes.qns}>
            How to apply for Credit Card?
          </Typography>
          <Typography id ="FAQ3" variant="body1" align="left" className={classes.ans}>
            Simply login to your Optimum DigiBank Internet Banking to apply.
          </Typography>
          <Typography id ="FAQ4" variant="h5" component="h5" align="left" className={classes.qns}>
            What is the minimum income level to apply for Credit Card?
          </Typography>
          <Typography id ="FAQ5" variant="body1" align="left" className={classes.ans}>
            To qualify, you’ll need to earn a minimum annual income of S$30,000.
          </Typography>
          <Typography id ="FAQ6" variant="h5" component="h5" align="left" className={classes.qns}>
            What is eligibility for Credit Card Application?
          </Typography>
          <Typography id ="FAQ7" variant="body1" align="left" className={classes.ans}>
            You will need to be above 21 years and earn a gross annual income of S$30k.
          </Typography>
          <Typography id ="FAQ8" variant="h5" component="h5" align="left" className={classes.qns}>
            How to check Credit Card Application Status?
          </Typography>
          <Typography id ="FAQ9" variant="body1" align="left" className={classes.ans}>
            Log in to Optimum Digibank with your User ID and Password.
            Click on CreditCard Status under Service.
            Please allow 5 to 7 working days to process the application.
          </Typography>
        </Grid>
      </Container>
    </section>
  );
}

FAQ.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(FAQ);
