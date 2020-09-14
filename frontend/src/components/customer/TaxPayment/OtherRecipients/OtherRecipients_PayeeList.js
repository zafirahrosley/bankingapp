import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/OtherRecipients.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storePayee } from "../../../redux/actions/taxPayment_storeInput";
import { useHistory, Link, NavLink } from "react-router-dom";

var payeeList = [];

export default function BodyContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:9000/payee/tax/5ee9d8eea80b44418c8d8b6c")
        .then((response) => {
          console.log(response);
          payeeList = response.data.payee;
          setLoading(true);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  });

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

  const handleOnClick = (event) => {
    payeeList.map((obj) => {
      if (obj._id === event.target.id) {
        dispatch(storePayee(obj));
      }
    });
    history.push("/Customer/TaxPayment/OtherRecipients/Form");
  };

  return (
    <div>
      <Grid container direction="row" justify="space-evenly" wrap="wrap">
        <Grid item sm={10} className={classes.gridMargin + " taxPayment"}>
          <h1>Tax Payment</h1>
        </Grid>
        <Grid item sm={12}>
          {payeeList.map((obj) => (
            <Paper
              elevation={3}
              id={obj._id}
              className="paperHeight"
              onClick={(e) => handleOnClick(e)}
            >
              <span>{obj.name}</span>
              <br />
              <br />
              <span>Income Tax</span>
              <InfoIcon className="infoIcon" />
            </Paper>
          ))}
        </Grid>
      </Grid>
      <a href="/Customer/TaxPayment/AddPayee">
        <Button id="addPayee" variant="contained">
          Add Payee
        </Button>
      </a>
    </div>
  );
}
