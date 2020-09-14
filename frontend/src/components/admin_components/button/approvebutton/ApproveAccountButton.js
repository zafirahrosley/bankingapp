import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import axios from "axios"

// Overrides the current default theme provided by the material UI
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#00a152",
    color: "#fff",
    right: "100px",
  },
}));

const ApproveAccountButton = ({approvedValue, onHandleSaveID}) => {
 
  const approveCustomer = () => {
    axios
      .patch(`http://localhost:9000/users/${approvedValue}/activate`)
      .then((response) => {
        console.log(response.data.Users);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    approveCustomer();
  }, [approvedValue])

  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" value={approvedValue} onClick={onHandleSaveID} className={classes.root}>
        Approve
      </Button>
    </div>
  );
}

export default ApproveAccountButton