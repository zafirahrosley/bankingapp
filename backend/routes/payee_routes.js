const express = require("express");
const router = express.Router();

const PayeeController = require("../controllers/payee_controller");

router.get("/mobile/:userId", PayeeController.payee_get_by_userId_MobileBill);
router.get("/transfer/:userId", PayeeController.payee_get_by_userId_Transfer);
router.post("/addPayee", PayeeController.add_Payee);
// router.delete("/:userId", PayeeController.user_delete);
// router.patch("/:userId/number", PayeeController.update_user_type);

module.exports = router;
