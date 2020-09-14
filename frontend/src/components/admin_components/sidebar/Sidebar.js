import React, { useState } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faHome,
  faIdCard,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  List,
} from "@material-ui/core";
import clsx from 'clsx';

// Overrides the current default theme provided by the material UI
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    maxWidth: "300px",
    backgroundColor: "#AA3A21",
  },
  headerTextStyle: {
    color: "#fff",
    paddingBottom: "25px",
    paddingTop: "20px",
    paddingLeft: "20px",
    fontFamily: "Arial",
    fontStyle: "Italic",
  },
  overviewTextStyle: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: "3px"
  },

  textStyle: {
    color: "#fff",
    paddingRight: "20px",
    fontFamily: "sans-serif",
    letterSpacing: "2px",
  },

  activeStyle: {
    backgroundColor: "#ffe082",
  },

  iconStyle: {
    paddingLeft: "15px",
    minWidth: "38px",
  },

  drawerStyle: {
    position: 'fixed',
    whiteSpace: 'nowrap',
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const [optionState, setOptionState] = useState(1);

  const handleOptionSelected = (event, index) => {
    setOptionState(index);
  };

  return (
    // Wraps the Paper around the List
    <Drawer variant="permanent" classes={{paper: clsx(classes.drawerStyle)}}>
      <List className={classes.root}>
        <Typography
          variant="h6"
          gutterBottom
          align="left"
          className={classes.headerTextStyle}
        >
          Optimum DigiBank
        </Typography>
        <ListItem
          button
          selected={optionState === 0}
          onClick={(event) => handleOptionSelected(event, 0)}
          style={{ marginTop: "35px", marginBottom: "15px" }}
          disableRipple
        >
          <ListItemIcon className={classes.iconStyle}>
            <FontAwesomeIcon icon={faHome} color="white" />
          </ListItemIcon>
          <Link to="/Admin" style={{ textDecoration: "none", textTransform:"uppercase" }}>
            <ListItemText
              // ListItemText uses the default Typography Settings
              disableTypography
              primary="Overview"
              className={classes.overviewTextStyle}
            />
          </Link>
        </ListItem>
        <ListItem
          button
          selected={optionState === 1}
          onClick={(event) => handleOptionSelected(event, 1)}
          disableRipple
        >
          <ListItemIcon className={classes.iconStyle}>
            <FontAwesomeIcon icon={faIdCard} color="white" />
          </ListItemIcon>
          <Link to="/customerdetails" style={{ textDecoration: "none" }}>
            <ListItemText
              primary="Customer Details"
              className={classes.textStyle}
              disableTypography
            />
          </Link>
        </ListItem>
        <ListItem
          button
          selected={optionState === 2}
          onClick={(event) => handleOptionSelected(event, 2)}
          disableRipple
        >
          <ListItemIcon className={classes.iconStyle}>
            <FontAwesomeIcon icon={faUsers} color="white" />
          </ListItemIcon>
          <Link to="/approvalstatus" style={{ textDecoration: "none" }}>
            <ListItemText
              primary=" Approval Status"
              className={classes.textStyle}
              disableTypography
            />
          </Link>
        </ListItem>
        <ListItem
          button
          selected={optionState === 3}
          onClick={(event) => handleOptionSelected(event, 3)}
          disableRipple
        >
          <ListItemIcon className={classes.iconStyle}>
            <FontAwesomeIcon icon={faCreditCard} color="white" />
          </ListItemIcon>
          <Link to="/creditcardstatus" style={{ textDecoration: "none" }}>
            <ListItemText
              primary="CreditCard Status"
              className={classes.textStyle}
              disableTypography
            />
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
}
