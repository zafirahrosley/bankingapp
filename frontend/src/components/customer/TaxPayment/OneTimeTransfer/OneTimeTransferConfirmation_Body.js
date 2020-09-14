import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/OneTimeTransfer.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { store } from "../../../../index";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function BodyContainer() {
  const history = useHistory();
  const state = store.getState();
  console.log("store: " + state);
  console.log("cc id:" + state.taxPayment.creditCard._id);
  const handleSubmit = () => {
    axios
      .post("https://bankapp-backend.herokuapp.com/payment_history/addPayment", {
        payment_type: "Tax",
        payment_amount: state.taxPayment.amount,
        transfer_number: 1,
        creditcardId: state.taxPayment.creditCard._id,
      })
      .then((response) => {
        console.log(response);
        axios
          .patch("https://bankapp-backend.herokuapp.com/creditcard/updateBalance", {
            creditcardId: state.taxPayment.creditCard._id,
            creditcard_balance:
              state.taxPayment.creditCard.creditcard_balance -
              state.taxPayment.amount,
          })
          .then((response2) => {
            console.log(response2);
            window.location.href = "/Customer/Payment/Successful";
          })
          .catch((error) => {
            console.log(error);
            window.location.href = "/Customer/Payment/Unsuccessful";
          });
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/Customer/Payment/Unsuccessful";
      });
  };

  const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,

    gridMargin: {
      marginTop: theme.spacing(1),
    },

    textBoxMargin: {
      marginTop: theme.spacing(5),
    },

    formControl: {
      marginTop: theme.spacing(8),
      minWidth: 240,
    },
  }));

  const classes = useStyles();

  const formTo = (
    <div className="toForm toFormConfirmation">
      <h1>To</h1>
      <p>Reference Number: {state.taxPayment.phoneNumber}</p>
      <p>Income Tax</p>
      <p>$ {state.taxPayment.amount}</p>
    </div>
  );

  const formFrom = (
    <div className="fromForm fromFormConfirmation">
      <h1>From</h1>
      <p>{state.taxPayment.creditCard.creditcard_type}</p>
      <div>
        <Button
          id="submitButton"
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
      <div>
        <Button
          id="cancelButton"
          variant="contained"
          onClick={() => (window.location.href = "/Customer/Payment/Unsuccessful")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <main className="content">
      <div className={classes.appBarSpacer} />
      <Grid container direction="row" justify="space-evenly" wrap="wrap">
        <Grid item sm={10} className={classes.gridMargin + " taxPayment"}>
          <h1>Tax Payment Details</h1>
        </Grid>
        <Grid
          item
          sm={6}
          direction="row"
          className={classes.gridMargin + " border"}
        >
          {formTo}
        </Grid>
        <Grid item sm={6} className={classes.gridMargin + " border"}>
          {formFrom}
        </Grid>
      </Grid>
    </main>
  );
}
