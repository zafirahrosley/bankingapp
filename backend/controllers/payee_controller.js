const mongoose = require("mongoose");
const Payee = require("../models/payee_model");
const User = require("../models/user");

exports.add_Payee = (req, res) => {
  User.findById(req.body.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      const payee = new Payee({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        number: req.body.number,
        payee_type: req.body.payee_type,
        user: req.body.userId,
      });
      return payee.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Payee stored",
        createdPayee: {
          _id: result._id,
          name: result.name,
          number: result.number,
          payee_type: result.payee_type,
          user: result.user,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.payee_get_by_userId_MobileBill = (req, res) => {
  const userId = req.params.userId;
  Payee.find({ user: userId, payee_type: "MobileBill" })
    .select("name number payee_type user _id")
    .exec()
    .then((doc) => {
      console.log("From db", doc);
      if (doc) {
        res.status(200).json({
          payee: doc,
        });
      } else {
        res.status(404).json({ message: "No valid entry found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.payee_get_by_userId_Transfer = (req, res) => {
  const userId = req.params.userId;
  Payee.find({ user: userId, payee_type: "Transfer" })
    .select("name number payee_type user _id")
    .exec()
    .then((doc) => {
      console.log("From db", doc);
      if (doc) {
        res.status(200).json({
          payee: doc,
        });
      } else {
        res.status(404).json({ message: "No valid entry found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
