import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import "./css/Searchbar.css";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Searchbar() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" className="appBar">
        <Toolbar className="toolbar">
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="SEARCH"
              classes={{
                root: "inputRoot",
                input: "inputInput",
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <IconButton color="inherit">
            <AccountCircleIcon />
            <Typography
              component="h6"
              variant="p"
              color="inherit"
              noWrap
              className="title"
            >
              Ethan Khoo
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
