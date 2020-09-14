import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/OneTimeTransfer.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { store } from "../../../../index";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { storeInput } from "../../../redux/actions/transferMoney_storeInput";
import axios from "axios";

export default function BodyContainer() {
  const dispatch = useDispatch();
  const state = store.getState();
  const history = useHistory();
  console.log(state);

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [creditCard, setCreditCard] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState("hidden");
  const [nextButton, setNextButton] = useState(false);
  const [cards, setCards] = useState([]);
  const customerId = sessionStorage.getItem("_id");

  useEffect(() => {
    axios
      .post("https://bankapp-backend.herokuapp.com/creditcard/cust/searchActive", {
        userId: customerId,
      })
      .then((response) => {
        setCards(response.data.creditcard);
        setLoading(true);
      })
      .catch((error) => console.log(error));
  });

  const handleAmount = (value) => {
    if (value > creditCard.creditcard_balance) {
      setVisible("visible");
      setNextButton(true);
    } else {
      setVisible("hidden");
      setNextButton(false);
    }
  };

  const handleCreditCard = (e) => {
    cards.map((creditcard) => {
      if (creditcard.creditcard_type === e.target.value) {
        setCreditCard(creditcard);
        if (amount > creditcard.creditcard_balance) {
          setVisible("visible");
          setNextButton(true);
        } else {
          setVisible("hidden");
          setNextButton(false);
        }
      }
    });
    console.log(creditCard);
  };

  const handleFormInputs = () => {
    if (amount != "" && Object.keys(creditCard).length != 0) {
      dispatch(
        storeInput(
          state.transfer.payeeInfo.accountNumber,
          amount,
          creditCard,
          name
        )
      );
      history.push("/Customer/TransferMoney/ConfirmationPage");
    } else alert("Please fill in the form");
  };

  const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,

    gridMargin: {
      marginTop: theme.spacing(1),
    },

    textBoxMargin: {
      marginTop: theme.spacing(0),
    },

    formControl: {
      marginTop: theme.spacing(1),
      minWidth: 240,
    },

    errorMessage: {
      visibility: visible,
    },

    nextButton: {
      marginTop: "100px",
      width: "260px",
      backgroundColor: "#e26448",
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#e26448",
      },
      fontSize: "1.25em",
    },
  }));

  const classes = useStyles();

  const formTo = (
    <div className="toForm">
      <h1>To</h1>
      <div>
        <p>
          {state.transfer.payeeInfo.name} ({state.transfer.payeeInfo.number})
        </p>
        <p>Transfer Money</p>
      </div>
      <div>
        <TextField
          required
          className={classes.textBoxMargin}
          id="amountInput"
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            handleAmount(e.target.value);
          }}
        />
      </div>
    </div>
  );

  const formFrom = (
    <div className="fromForm">
      <h1>From</h1>
      <div>
        <FormControl variant="filled" className={classes.formControl}>
          <Select
            labelId="selectCreditCard"
            id="selectCreditCard"
            onChange={(e) => handleCreditCard(e)}
          >
            {cards.map((obj) => (
              <MenuItem value={obj.creditcard_type}>
                {obj.creditcard_type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <p>Current Balance</p>
      <p>${creditCard.creditcard_balance}</p>
      <p className={classes.errorMessage + " errorMessage"}>
        Please type in an amount less than the balance amount
      </p>
      <Button
        className={classes.nextButton}
        variant="contained"
        onClick={() => handleFormInputs()}
        disabled={nextButton}
      >
        Next
      </Button>
    </div>
  );

  return (
    <main className="content">
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
        <Grid item sm={6} className={classes.gridMargin + " border"}>
          {formFrom}
        </Grid>
      </Grid>
    </main>
  );
}
