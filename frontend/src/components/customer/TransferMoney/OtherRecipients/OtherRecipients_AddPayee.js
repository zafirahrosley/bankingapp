import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/OtherRecipients.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function BodyContainer() {
  const history = useHistory();

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

  const [name, setName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const customerId = sessionStorage.getItem("_id");

  const handleSavePayee = () => {
    if (name != undefined && accountNumber != undefined) {
      axios
        .post("https://bankapp-backend.herokuapp.com/payee/addPayee", {
          name: name,
          number: accountNumber,
          payee_type: "Transfer",
          userId: customerId,
        })
        .then((response) => {
          console.log(response);
          history.push("/Customer/TransferMoney/OtherRecipients");
        })
        .catch((error) => console.log(error));
    } else alert("Please complete the form!");
  };

  const classes = useStyles();

  const formTo = (
    <div className="toForm">
      <h1>To</h1>
      <div>
        <TextField
          required
          className={classes.textBoxMargin}
          id="nameInput"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          className={classes.textBoxMargin}
          id="accountNumberInput"
          label="Account Number"
          type="number"
          value={accountNumber}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 8);
          }}
          onChange={(e) => {
            setAccountNumber(e.target.value);
          }}
        />
      </div>
    </div>
  );
  return (
    <main className="content">
      <div className={classes.appBarSpacer} />
      <Grid container direction="row" justify="space-evenly" wrap="wrap">
        <Grid item sm={10} className={classes.gridMargin + " billPayment"}>
          <h1>Bill Payment</h1>
        </Grid>
        <Grid
          item
          sm={6}
          direction="row"
          className={classes.gridMargin + " border"}
        >
          {formTo}
        </Grid>
        <Grid
          item
          sm={6}
          direction="row"
          className={classes.gridMargin + " border"}
        >
          <div className="buttonContainer">
            <div>
              <Button
                id="savePayeeButton"
                variant="contained"
                onClick={() => handleSavePayee()}
              >
                Save Payee
              </Button>
            </div>
            <div>
              <Button
                id="cancelButton"
                variant="contained"
                onClick={() =>
                  history.push("/Customer/TransferMoney/OtherRecipients")
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </main>
  );
}
