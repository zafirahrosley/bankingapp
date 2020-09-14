const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentHistorySchema = new Schema ({
    _id: Schema.Types.ObjectId,
    payment_type: {
        type: String,
        enum: ["Mobile Bill", "Transfer", "Tax"],
        required:true
      },
      payment_amount: {
        type: Number,
        required: true
      },
      date_time: {
        type: Date,
        default: Date.now()
      },
      transfer_number: {
        type: Number,
        required:true
      },
      creditCard: {
        type: Schema.Types.ObjectId,
        ref: "CreditCard",
        required: true
      },
})

module.exports = mongoose.model("Payment_History", PaymentHistorySchema);