const orderController = require('../controllers/orderController');
const express = require('express');
const router = express.Router();
const mwError = require("../MW/validatiomMW");
const { orderValidationAdd, orderValidationUpdate, orderValidationDelete, orderItemValidationDelete } = require("../MW/orderMW");

router.route("/orders")
    .get(orderController.getAllOrder)
    .post(orderValidationAdd, mwError, orderController.createNewOrder)
router.route("/order/:id")
    .get(mwError, orderController.getOrderById)
    .put(orderValidationUpdate, mwError, orderController.updateOrderById)
    .delete(orderValidationDelete, mwError, orderController.deleteOrderById)


router.route("/orderItems/:id")
    .delete(orderItemValidationDelete, mwError, orderController.deleteOrderItemById)




module.exports = router;


