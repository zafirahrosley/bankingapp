// based on ProductHowItWorks.js
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import WorkIcon from '@material-ui/icons/Work';
import LockIcon from '@material-ui/icons/Lock';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';

const styles = (theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/bank2.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
  },
  box: {
    backgroundColor: '#AA3A21',
    padding: '30px',
    borderRadius: 20,
    position: 'left',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 10),
  },
  title: {
    marginBottom: theme.spacing(5),
    fontWeight: 700,
  },
  subtitle: {
    marginBottom: theme.spacing(10),
  },

});

function PersonalBanking(props) {
  const { classes } = props;

  return (

    <section className={classes.root} id="PersonalBanking">

      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={6}>

            <Box className={classes.box} align="center">
              <Typography id ="PersonalBanking1" variant="h2" className={classes.title} component="h2">
                Personal Banking
              </Typography>

              <Typography id ="PersonalBanking2" variant="h4" className={classes.subtitle} component="h2">
                Considering your daily purchases? Optimum got your back.
              </Typography>

              <div>
                <Grid container spacing={5}>

                  <Grid item xs={12} md={6}>
                    <WorkIcon />
                    <Typography id ="PersonalBanking3" variant="h6" align="center">
                      EXPERIENCE
                    </Typography>

                    <Typography id ="PersonalBanking4" variant="body1" align="center">
                      We craft the absolute for you.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>

                    <AttachMoneyIcon />
                    <Typography id ="PersonalBanking5" variant="h6" align="center">
                      CONVENIENCE
                    </Typography>

                    <Typography id ="PersonalBanking6" variant="body1" align="center">
                      With our DigitalBank, you can worry less.
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={6}>

                    <LockIcon />
                    <Typography id ="PersonalBanking7" variant="h6">
                      SECURE. SAFE ACCESS.
                    </Typography>
                    <Typography id ="PersonalBanking8" variant="body1" align="center">
                      Safety is not just our priority.
                      We Safeguard what is on your heart.
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <EditIcon />
                    <Typography id ="PersonalBanking9" variant="h6" align="center">
                      EASY TO USE
                    </Typography>

                    <Typography id ="PersonalBanking10" variant="body1" align="center">
                      We support our customers all the way, even if it is about a reach of a pocket.
                    </Typography>

                  </Grid>

                </Grid>
              </div>

            </Box>

          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

PersonalBanking.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(PersonalBanking);
