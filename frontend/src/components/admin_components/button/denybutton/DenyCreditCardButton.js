import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

// Overrides the current default theme provided by the material UI
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#d32f2f",
    color: "#fff",
    right: "120px",
  },
}));

export default function DenyCreditCardButton() {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" className={classes.root}>
        Deny
      </Button>
    </div>
  );
}
