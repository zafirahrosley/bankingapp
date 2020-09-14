const express = require("express");
const router = express.Router();

const { auth, authReset } = require("../middleware/auth");
const UserController = require("../controllers/user");

//s1
router.post("/register", UserController.user_register); // A checked
router.post("/login", UserController.user_login); // A checked
router.post("/forget_password", UserController.forgot_password); // A checked
router.patch("/recover/:token", authReset, UserController.resetPassword); // A checked

//s2
//view customer details
router.get("/", UserController.user_get_all); // A checked
//search customer by email
router.get("/search/email", UserController.users_get_by_email); // A checked
//search customer by name
router.get("/search/name", UserController.users_get_by_name); // A checked
//search customer by id
router.get("/search/userId", UserController.user_get_by_id); // A checked
//search for pending customers
router.get("/pending", UserController.user_pending); // A checked
//search for active customers
router.get("/active", UserController.user_active); // A checked
//delete users
router.delete("/delete", UserController.user_delete); // A checked
//account activate
router.patch("/activate", UserController.update_activate_account); // A checked
//account deactivate
router.patch("/deactivate", UserController.update_deactivate_account); // A checked

module.exports = router;
