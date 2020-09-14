// AboutUs.js
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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
  location: {
    height: '100%',
    width: '100%',
  },
});

function ContactUs(props) {
  const { classes } = props;

  return (
    <section className={classes.root} id="ContactUs">
      <Container className={classes.container}>
        <Typography id="contact1" variant="h2" marked="center" className={classes.title} component="h2">
          Contact Us
        </Typography>
        <Typography id="contact2" variant="h4" marked="center" className={classes.subtitle} component="h2">
          How may we assist you?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              {/* <img src="..public/images/map.png" alt=""/> */}
              <Link id="contact3" href="https://www.google.com/maps/place/Optimum+Solutions/@1.3366694,103.9659299,15z/data=!4m5!3m4!1s0x0:0x3679bdeef327887!8m2!3d1.3366694!4d103.9659299">
                <img src="../images/map.png" alt="map" className={classes.location} />
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <Typography variant="h6" align="left">
                  <div>
                    We are located at:
                    1 Changi Business Park Crescent,
                    Plaza8 @ CBP, #03-09 to #03-12,
                    Podium B, 486025
                    <br />
                    Contact No: +65 6236 0070
                    <br />
                    Fax No: +65 65351334
                    <br />
                    Email: info@optimumdigibank.com
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

ContactUs.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default (withStyles(styles)(ContactUs));
