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
    left: "41%",
    margin: "5px 5px 5px 5px",
  },

  denyButtonStyle: {
    background: "#d32f2f",
    color: "#fff",
    right: "100%",
  },
}));

export default function CreditCardStatus() {
  const classes = useStyles();

  const [approveCreditCardState, setApproveCreditCardState] = useState();
  const [denyCreditCardState, setDenyCreditCardState] = useState();
  const [allCreditCardState, setAllCreditCardState] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get all pending creditcard
  // const getAllCreditCard = () => {
  //   axios
  //     .get(`http://localhost:9000/creditcard/pending`)
  //     .then((response) => {
  //       // Retrieve from object => object => array (creditcard)
  //       setAllCreditCardState(response.data.creditcard);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // Upon loading, useEffect will get called
  useEffect(() => {
    //getAllCreditCard();
    axios
      .get(`http://localhost:9000/creditcard/pending`)
      .then((response) => {
        // Retrieve from object => object => array (creditcard)
        setRows([...response.data.creditcard]);
        setAllCreditCardState(response.data.creditcard);
      })
      .catch((error) => console.log(error));
  });

  const getApproveCreditCard = (id, type) => {
    axios
      .patch(`https://bankapp-backend.herokuapp.com/creditcard/approve/`, {
        cardId: id,
        creditcard_type: type,
      })
      .then((response) => {
        //console.log(response.data.creditcard.creditcard_status);
      })
      .catch((error) => console.log(error));
  };

  const getDenyCreditCard = (id) => {
    axios
      .patch(`https://bankapp-backend.herokuapp.com/creditcard/reject`, {
        cardId: id,
      })
      .then((response) => {
        console.log(response.data.creditcard.creditcard_status);
      })
      .catch((err) => console.log(err));
  };

  const onClickApprove = (event) => {
    let cardType = document.getElementById(`${event.target.value}type`)
      .innerText;
    //setApproveCreditCardState(event.target.value);
    getApproveCreditCard(event.target.value, cardType);
    //console.log(cardType);
  };

  const onClickDeny = (event) => {
    getDenyCreditCard(event.target.value);
    //setDenyCreditCardState(event.target.value);
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
              <Table className={classes.table}>
                <TableHead>
                  <Typography
                    style={{ letterSpacing: "3px", width: "max-content" }}
                    variant="h6"
                  >
                    Customer CreditCard Approval Status
                  </Typography>
                  <Grid>
                    <FontAwesomeIcon
                      icon={faSearch}
                      className={classes.searchIconStyle}
                    />
                    <TextField id="search-with-icon" label="SEARCH" />
                  </Grid>
                  <TableRow>
                    <TableCell style={{ letterSpacing: "2px" }} width="30%">
                      Customer ID
                    </TableCell>
                    <TableCell style={{ letterSpacing: "2px" }} width="20%">
                      Email
                    </TableCell>
                    <TableCell style={{ letterSpacing: "2px" }} width="15%">
                      CreditCard Type
                    </TableCell>
                    <TableCell
                      style={{ letterSpacing: "2px" }}
                      width="25%"
                      align="right"
                    >
                      Approve / Deny CreditCard
                    </TableCell>
                    <TableCell
                      style={{ letterSpacing: "2px" }}
                      width="10%"
                      align="left"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCreditCardState
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row._id}>
                        <TableCell
                          style={{ letterSpacing: "2px" }}
                          width="30%"
                          component="th"
                          scope="row"
                        >
                          {row._id}
                        </TableCell>

                        <TableCell style={{ letterSpacing: "2px" }} width="20%">
                          {row.user.email}
                        </TableCell>

                        <TableCell
                          id={`${row._id}type`}
                          style={{ letterSpacing: "2px" }}
                          width="15%"
                        >
                          {row.creditcard_type}
                        </TableCell>
                        <TableCell
                          style={{
                            letterSpacing: "2px",
                          }}
                          //width="15%"
                          align="right"
                        >
                          {/* {console.log(row._id)} */}
                          <button
                            className={classes.approveButtonStyle}
                            variant="contained"
                            value={row._id}
                            onClick={onClickApprove}
                            //disableRipple
                          >
                            Approve
                          </button>
                          <button
                            className={classes.denyButtonStyle}
                            variant="contained"
                            value={row._id}
                            onClick={onClickDeny}
                            //disableRipple
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
