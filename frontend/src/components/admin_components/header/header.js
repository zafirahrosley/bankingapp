import React, { useState, useRef, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  AppBar,
  MenuList,
  Toolbar,
  MenuItem,
  Button,
  Grow,
  Popper,
  Paper,
  ClickAwayListener,
} from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCog,
  faUser,
  faCaretDown,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from 'react-redux';

// Overrides the current default theme provided by the material UI
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    padding: "10px",
  },

  menuButtonStyle: {
    // Button by default has uppercase text
    width: "170px",
    fontFamily: "sans-serif",
    textTransform: "None",
    letterSpacing: "0.5px",
  },

  toolBarStyle: {
    flex: "auto",
    justifyContent: "flex-end",
  },
}));

export default function Header() {
  const classes = useStyles();
  const userName = useSelector(state => state.userInfo.name);
  const [openState, setOpenState] = useState();
  //const [name, setName] = useState();
  const referenceAnchor = useRef(null);

  const handleOnClickDropdown = () => {
    setOpenState((openPreviously) => !openPreviously);
  };

  const handleClose = (event) => {
    if (
      referenceAnchor.current &&
      referenceAnchor.current.contains(event.target)
    ) {
      return;
    }
    setOpenState(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenState(false);
    }
  }

  function handleLogout(){
    sessionStorage.clear()
    window.location.href="/Logout"
  }
  // useEffect(() => {
  //   setName(JSON.parse(sessionStorage.getItem('name')));
  // });

  // return focus to the button when transitioning from closed to open
  const openPreviously = useRef(openState);
  useEffect(() => {
    // let name = sessionStorage.getItem('name');
    // setName(name);
    if (openPreviously.current === true && openState === false) {
      referenceAnchor.current.focus();
    }
    openPreviously.current = openState;
  }, [openState]);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className={classes.toolBarStyle}>
        <Button
          className={classes.menuButtonStyle}
          ref={referenceAnchor}
          aria-controls={openState ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleOnClickDropdown}
          disableRipple
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            size="2x"
            color="#0e4686"
            pull="left"
          />
          {userName}

          <FontAwesomeIcon
            icon={faCaretDown}
            size="1x"
            color="#0e4686"
            pull="right"
            fixedWidth
          />
        </Button>

        <Popper
          open={openState}
          anchorEl={referenceAnchor.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper
                square
                style={{ color: "#fff", backgroundColor: "#0e4686" }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={openState}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      Profile
                      <FontAwesomeIcon
                        icon={faUser}
                        color="#fff"
                        style={{ marginLeft: "73px" }}
                      />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      Settings
                      <FontAwesomeIcon
                        icon={faCog}
                        color="#fff"
                        style={{ marginLeft: "60px" }}
                      />
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      Logout
                      <FontAwesomeIcon
                        icon={faDoorOpen}
                        color="#fff"
                        style={{ marginLeft: "68px" }}
                      />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
    </AppBar>
  );
}
