import React, {useEffect} from "react";
import CustomerDetails from "./CustomerDetails";
import ApprovalStatus from "./ApprovalStatus";
import CreditCardStatus from "./CreditCardStatus";
import Overview from "./Overview";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./header/header";
import Sidebar from "./sidebar/Sidebar";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // Allocate space for an item in the flex container to grow
    flexGrow: 1,
    // Adjust according to the (screen) length of the device
    height: "100vh",
  },
  module: {
    position: "relative",
    left: "10vw"

  }
}));


export default function Mainpage() {
  const classes = useStyles();
  
  useEffect(() => {
    let auth = sessionStorage.getItem('token');
    let type = sessionStorage.getItem('type');
    if(auth === null ){
      window.location.href = "/Login";
    }else{
      if(type !== "Admin"){
        window.location.href ="/Customer";
      }
    }
  });

  return (
    <>
      <Header />
      <Router>
        <div className={classes.root}>
        <Sidebar />
        <div className={classes.module}>
          <Switch>
            <Route exact path="/Admin">
              <Overview></Overview>
            </Route>
            <Route path="/customerDetails">
              <CustomerDetails />
            </Route>
            <Route path="/approvalstatus">
              <ApprovalStatus />
            </Route>
            <Route path="/creditcardstatus">
              <CreditCardStatus />
            </Route>
          </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}
