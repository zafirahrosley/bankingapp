import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../Overview/Overview.css";
import { store } from "../../../index";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function ApplyCreditcardSubmit() {
  const history = useHistory();
  const state = store.getState();
  const classes = useStyles();
  const referenceNum = "1234567";
  const creditcardName = state.applyCreditcard.creditcardName;
  const creditcardType = state.applyCreditcard.selectedCardType;
  console.log("state.applyCreditcard.selectedCardType");
  console.log(state.applyCreditcard.selectedCardType);

  const customerId = sessionStorage.getItem("_id");
  const [custEmail, setCustEmail] = useState();
  var arr = [];

  useEffect(() => {
    axios
      .get("https://bankapp-backend.herokuapp.com/users/search/userId", {
        userId: customerId,
      })
      .then((res) => {
        console.log("Success");
        const test = res.data.user;
        setCustEmail(test.email);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = () => {
    window.location.href = "/Customer";
  };

  const applyCC = () => {
    //selected creditcard type is not in DB (Apply new CC)
    axios
      .post("https://bankapp-backend.herokuapp.com/creditcard/creditcardApplication", {
        creditcard_type: creditcardType,
        userId: customerId,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <main className="content">
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className="container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2 className="darkRedColor">Credit Card Application</h2>
              <p className="darkBlueColor">Ref No.: {referenceNum}</p>
              <p className="darkBlueColor">{creditcardName}</p>
              <p className="darkBlueColor">{custEmail}</p>
            </Grid>
          </Grid>
          <Link to="/Customer/apply-creditcard/creditcard-confirm">
            <Button variant="contained" id="cardApplyBtn" onClick={applyCC}>
              Apply
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="contained"
              id="cardCancelBtn"
              onClick={handleChange}
            >
              Cancel
            </Button>
          </Link>
        </Container>
      </main>
    </React.Fragment>
  );
}
