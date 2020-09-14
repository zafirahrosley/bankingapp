const express = require("express");
const router = express.Router();

const PaymentHistoryController = require("../controllers/payment_history_controller");

router.post(
  "/checkPayment",
  PaymentHistoryController.paymentHistory_get_all_by_creditcardId
); // A checked
router.post("/addPayment", PaymentHistoryController.add_paymentHistory); // A checked
//router.post("/creditcardApplication", PaymentHistoryController.creditcard_application);
// router.get("/:userId", PaymentHistoryController.user_get_by_id);
// router.delete("/:userId", PaymentHistoryController.user_delete);
// router.patch("/:userId/account", PaymentHistoryController.update_user_type);

module.exports = router;
