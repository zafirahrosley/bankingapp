const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayeeSchema = new Schema({
  _id: Schema.Types.ObjectId,

  name: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
    default: 0,
  },

  payee_type: {
    type: String,
    enum: ["Transfer", "MobileBill", "PayTax"],
    require: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("Payee", PayeeSchema);
