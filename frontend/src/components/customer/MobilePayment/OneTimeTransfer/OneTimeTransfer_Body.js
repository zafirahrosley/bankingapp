import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/OneTimeTransfer.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { storeInput } from "../../../redux/actions/mobilePayment_storeInput";
import { store } from "../../../../index";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";


export default function BodyContainer() {
  const dispatch = useDispatch();
  console.log(store.getState());
  const history = useHistory();

  const handleFormInputs = () => {
    if (amount != "" && Object.keys(creditCard).length != 0 && phoneNumber != "") {
      dispatch(storeInput(phoneNumber, amount, creditCard));
      history.push("/Customer/MobilePayment/ConfirmationPage");
    } else alert("Please fill in the form");
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [creditCard, setCreditCard] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState("hidden");
  const [nextButton, setNextButton] = useState(false);
  const [cards, setCards] = useState([]);
  let id = sessionStorage.getItem("_id");

  useEffect(() => {
    
      axios
        .post("https://bankapp-backend.herokuapp.com/creditcard/cust/searchActive", {
          userId: id
        })
        .then((response) => {
            setCards(response.data.creditcard);
            setLoading(true);
          })
        .catch(err => console.log(err))
      }, [cards]);

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
      fontSize: "1.25em"
    },
  }));

  const classes = useStyles();

  const formTo = (
    <div className="toForm">
      <h1>To</h1>
      <div>
        <TextField
          required
          className={classes.textBoxMargin}
          id="phoneNumberInput"
          label="Phone Number"
          type="number"
          value={phoneNumber}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 8);
          }}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
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
  );
}
