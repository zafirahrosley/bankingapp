import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  Grid,
  Paper,
  Container,
  TableHead,
  TableRow,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";

// Overrides the current default theme provided by the material UI
const useStyles = makeStyles((theme) => ({
  searchIconStyle: {
    marginTop: "25px",
    marginLeft: "20px",
    marginRight: "30px",
  },
  gridContainerStyle: {
    marginTop: "131px",
    height: "81%",
    marginLeft: "262px",
    width: "85%",
  },

  containerStyle: {
    maxWidth: "inherit",
  },

  tableContainerStyle: {
    height: "165%",
    minHeight: "80vh",
  },

  approveButtonStyle: {
    background: "#00a152",
    color: "#fff",
    right: "100px",
    margin: "5px 5px 5px 5px",
  },

  denyButtonStyle: {
    background: "#d32f2f",
    color: "#fff",
    right: "120px",
  },
}));

export default function ApprovalStatus() {
  const classes = useStyles();

  const [allCustomerState, setAllCustomerState] = useState([]);
  const [customerState, setCustomerState] = useState({});
  const [idState, setIdState] = useState();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Upon loading, useEffect will get called
  useEffect(() => {
    //getAllCustomer();
    axios
      .get(`https://bankapp-backend.herokuapp.com/users/pending`)
      .then((response) => {
        // Retrieve from object => object => array (Users)
        setRows([...response.data.Users]);
        setAllCustomerState(response.data.Users);
      })
      // throws an error if there is no data
      .catch((error) => console.log(error));
  });

  // const getAllCustomer = () => {
  //   axios
  //     .get(`http://localhost:9000/users/pending`)
  //     .then((response) => {
  //       // Retrieve from object => object => array (Users)
  //       setAllCustomerState(response.data.Users);
  //     })
  //     // throws an error if there is no data
  //     .catch((error) => console.log(error));
  // };

  // Searching for a specific customer
  const getSpecificCustomer = () => {
    axios
      .get(`https://bankapp-backend.herokuapp.com/users/search/${idState}`)
      .then((response) => {
        setCustomerState(response.data.user);
      })
      .catch((error) => console.log(error));
  };

  const handleId = (event) => {
    setIdState(event.target.value);
  };

  const approveCustomer = (id) => {
    axios
      .patch(`https://bankapp-backend.herokuapp.com/users/activate`, {
        userId: id,
        status: "Active",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const denyCustomer = (id) => {
    axios
      .patch(`https://bankapp-backend.herokuapp.com/deactivate`, {
        userId: id,
      })
      .then((response) => {
        console.log(response.data.Users);
      })
      .catch((error) => console.log(error));
  };

  const onClickApprove = (event) => {
    //setIdState(event.target.value);
    // let id = document.getElementById(`${event.target.value}`).value;
    approveCustomer(event.target.value);
  };

  const onClickDeny = (event) => {
    //setIdState(event.target.value);
    denyCustomer(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container className={classes.containerStyle} fixed>
      <Grid container justify="center" className={classes.gridContainerStyle}>
        <Grid item xs={12}>
          <TableContainer style={{ height: "100%" }}>
            <Paper style={{ height: "inherit", minWidth: "750px" }} elevation>
              <Table style={{ minWidth: "750px" }}>
                <TableHead>
                  <Typography
                    style={{ letterSpacing: "3px", width: "max-content" }}
                    variant="h6"
                  >
                    Customer Account Approval Status
                  </Typography>
                  <Grid>
                    <FontAwesomeIcon
                      icon={faSearch}
                      className={classes.searchIconStyle}
                    />

                    <TextField
                      id="search-with-icon"
                      value={idState}
                      label="SEARCH"
                      onChange={(event) => setIdState(event.target.value)}
                    />
                  </Grid>
                  <TableRow>
                    <TableCell style={{ letterSpacing: "2px" }} width="30%">
                      Customer ID
                    </TableCell>
                    <TableCell style={{ letterSpacing: "2px" }} width="30%">
                      Email
                    </TableCell>
                    <TableCell
                      style={{ letterSpacing: "2px" }}
                      width="25%"
                      align="right"
                    >
                      Approve / Deny Account
                    </TableCell>
                    <TableCell
                      style={{ letterSpacing: "2px" }}
                      width="15%"
                      align="left"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCustomerState
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row._id}>
                        <TableCell
                          style={{ letterSpacing: "2px" }}
                          width="30%"
                          component="th"
                          scope="row"
                          id={row._id}
                        >
                          {row._id}
                        </TableCell>

                        <TableCell style={{ letterSpacing: "2px" }} width="30%">
                          {row.email}
                        </TableCell>
                        <TableCell
                          style={{ letterSpacing: "2px" }}
                          width="25%"
                          align="right"
                        >
                          <button
                            className={classes.approveButtonStyle}
                            variant="contained"
                            value={row._id}
                            onClick={onClickApprove}
                          >
                            Approve
                          </button>
                          <button
                            className={classes.denyButtonStyle}
                            variant="contained"
                            value={row._id}
                            onClick={onClickDeny}
                          >
                            Deny
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
