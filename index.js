const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const creditcardRoutes = require("./routes/creditcard");
const paymentHistoryRoutes = require("./routes/payment_history_routes");
const payeeRoutes = require("./routes/payee_routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9000;
//mongo connection - mongoose is a library to simplify syntax to mongo DB
mongoose.Promise = global.Promise; // gets a response from DB fail or success

//"mongodb+srv://optimum-leads:12345@optimumbatch7-1rg4n.mongodb.net/bankappphase2?retryWrites=true&w=majority"
//connect to the schema
//mongodb://localhost/bankAppPhase2
mongoose.connect(
  "mongodb+srv://optimum-leads:12345@optimumbatch7-1rg4n.mongodb.net/bankappphase2?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
//body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/users", userRoutes); //Using userRoutes file
app.use("/creditcard", creditcardRoutes);
app.use("/payment_history", paymentHistoryRoutes);
app.use("/payee", payeeRoutes);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
