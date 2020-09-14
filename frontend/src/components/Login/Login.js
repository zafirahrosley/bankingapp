import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userInfo } from "../redux/actions/userInfoActions";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/images/loginPic.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "absolute",
  },
  links: {
    textDecoration: "none",
    fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
    color: "#173A77",
    fontWeight: "700",
    fontSize: "1.5rem",
  },
  deselect: {
    textDecoration: "none",
    fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
    color: "#606E87",
    fontWeight: "700",
    fontSize: "1.5rem",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
    color: "#AA3A21",
    fontSize: "2.5rem",
    fontWeight: "700",
    fontStyle: "italic",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: "black",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#AA3A21",
    fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
    color: "#fff",
    "&:hover": {
      backgroundColor: "#AA3A21",
    },
  },
  forgetButton: {
    color: "#173A77",
    fontStyle: "bold",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [admin, setAdmin] = useState(false);
  const [customer, setCust] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    axios
      .post("https://bankapp-backend.herokuapp.com/users/login", {
        email,
        password: pass,
      })
      .then((res) => {
        setError(false);
        if (res.data.message === "success") {
          sessionStorage.setItem("token", res.data.token);
          dispatch(userInfo(res.data.name, res.data._id));
          sessionStorage.setItem("name", res.data.name);
          sessionStorage.setItem("_id", res.data._id);
          sessionStorage.setItem('type', res.data.user_type);
          if (res.data.user_type === "Admin") {
            //   window.location.href = '/Admin';
            setAdmin(true);
          } else {
            //   window.location.href = '/Dashboard';
            setCust(true);
          }
        }
        if (
          res.data.message ===
          "Your Account has not been approved by the Administrator"
        ) {
          setOpen(true);
          setMessage("Account not approved by Administrator");
        }
        if (res.data.message === "Your account has been inactive") {
          setOpen(true);
          setMessage("Your account has been deactivated");
        }
      })
      .catch(() => {
        setError(true);
      });
  };

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
              <a href="/Login" className={classes.links}>
                LOGIN
              </a>
            </Box>
            <Box p={5}>
              <a href="/SignUp" className={classes.deselect}>
                REGISTER
              </a>
            </Box>
          </Box>
          <form className={classes.form} onSubmit={submit}>
            <Collapse in={open}>
              <Alert
                severity="info"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {message}
              </Alert>
            </Collapse>
            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              autoFocus
              value={email}
              InputLabelProps={{
                style: {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "100%",
                  color: "#173A77",
                },
              }}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
                setOpen(false);
              }}
              error={!!error}
              helperText={error ? "Incorrect Username or password" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pass}
              InputLabelProps={{
                style: {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "100%",
                  color: "#173A77",
                },
              }}
              onChange={(e) => {
                setPass(e.target.value);
                setError(false);
                setOpen(false);
              }}
              error={!!error}
            />
            <div align="center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Login
              </Button>
              {admin ? <Redirect to="/Admin" /> : null}
              {customer ? <Redirect to="/Customer" /> : null}
            </div>
            <Grid container align="center">
              <Grid item xs>
                <Link
                  href="/ForgetPass"
                  variant="body2"
                  className={classes.forgetButton}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
