import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FaceBookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
    fontFamily: ["Avenir Heavy Oblique", "Arial Black", "sans serif"],
    color: "#fff",
  },
  text: {
    flexGrow: 1,
    fontFamily: ["Avenir Medium", "Arial Regular", "sans serif"],
    color: "#fff",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "#AA3A21",
    minHeight: "10vh",
  },
  icons: {
    display: "flex",
  },
  icon: {
    width: 48,
    height: 48,
    fontFamily: ["Avenir Medium", "Arial Regular", "sans serif"],
    color: "#fff",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <section className={classes.root}>
          <Container className={classes.container}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  <Typography
                    id="Footer1"
                    variant="h5"
                    className={classes.title}
                  >
                    Optimum Digibank
                  </Typography>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid item>
                  <Typography id="Footer2" className={classes.text}>
                    1 Changi Business Park Crescent, Plaza8 @ CBP, #03-09 to
                    #03-12 Podium B, 486035
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography id="Footer3" className={classes.text}>
                    Email: info@optimumdigibank.com
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <div>
                  <Grid item className={classes.icons}>
                    <Typography id="Footer4" className={classes.icon}>
                      <FaceBookIcon />
                    </Typography>
                    <Typography id="Footer5" className={classes.icon}>
                      <InstagramIcon />
                    </Typography>
                    <Typography id="Footer6" className={classes.icon}>
                      <YouTubeIcon />
                    </Typography>
                  </Grid>
                  <Typography id="Footer7" className={classes.text}>
                    © 2020 Optimum DigiBank. All rights reserved.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>
      </Toolbar>
    </AppBar>
  );
}
