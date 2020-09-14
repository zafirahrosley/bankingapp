import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import axios from "axios";

// Overrides the current default theme provided by the material UI
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#00a152",
    color: "#fff",
    right: "120px",
  },
}));

export default function ApproveCreditCardButton(props) {
  const classes = useStyles();
  const [approveCreditCardState, setApproveCreditCardState] = useState({});

  const getCreditCard = () => {
    axios
      .patch(`http://localhost:9000/users/approve/${props.value}`)
      .then((response) => {
        setApproveCreditCardState(response.data.creditcard);
        console.log(approveCreditCardState);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getCreditCard();
  }, [approveCreditCardState]);


}
