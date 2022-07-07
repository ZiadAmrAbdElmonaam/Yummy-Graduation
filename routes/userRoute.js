const express = require("express");
const mwError = require("../MW/validatiomMW");
const userController = require("../controllers/userController");
const router = express.Router();
const { userValaidationAdd, userValaidationUpdate, userValaidationDelete, userValidationDeleteOrder } = require("../MW/userMW");


router.route("/user")
    .get(userController.getAllUsers)

    .post(userValaidationAdd, mwError, userController.addUser)

router.route("/user/:id")
    .get(mwError, userController.getUserById)

    .put(
        userValaidationUpdate,
        mwError,
        userController.updateUserById)



    .delete(
        userValaidationDelete,
        mwError,
        userController.deleteUserById)
// router.route("/user-cancel-order/:id")
router.route("/userOrders/:id")
    .get(userController.getUserOrders)
    .delete(
        userValidationDeleteOrder,
        mwError,
        userController.deleteUserOrder)







module.exports = router;



