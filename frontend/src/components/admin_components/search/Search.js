import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


export default function Search() {
  const classes = useStyles("");

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid>
          <FontAwesomeIcon icon={faSearch} />
        </Grid>
        <Grid>
          <TextField id="search-with-icon" name="email" label="SEARCH" />
        </Grid>
      </Grid>
    </div>
  );
}

// Overrides the current default theme provided by the material UI
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
