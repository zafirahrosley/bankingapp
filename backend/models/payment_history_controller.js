const mongoose = require("mongoose");
const PaymentHistory = require("../models/payment_history_model");
const CreditCard = require("../models/creditcard");

exports.add_paymentHistory = (req, res) => {
  CreditCard.findById(req.body.creditcardId)
    .then((creditcard) => {
      if (!creditcard) {
        return res.status(404).json({ message: "CreditCard not found!" });
      }
      const paymentHistory = new PaymentHistory({
        _id: new mongoose.Types.ObjectId(),
        payment_type: req.body.payment_type,
        payment_amount: req.body.payment_amount,
        transfer_number: req.body.transfer_number,
        date_time: req.body.date_time,
        creditCard: req.body.creditcardId,
      });
      return paymentHistory.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Payment history updated",
        createdCust: {
          _id: result._id,
          payment_type: result.payment_type,
          payment_amount: result.payment_amount,
          transfer_number: result.transfer_number,
          date_time: result.date_time,
          creditCard: result.creditCard,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.paymentHistory_get_all_by_creditcardId = (req, res) => {
  const creditcardId = req.body.creditcardId;
  PaymentHistory.find({ creditCard: creditcardId })
    .populate("creditCard", ["creditcard_num", "creditcard_type"])
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        Users: docs.map((doc) => {
          return {
            payment_type: doc.payment_type,
            payment_amount: doc.payment_amount,
            date_time: doc.date_time,
            transfer_number: doc.transfer_number,
            creditCard: doc.creditCard,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
