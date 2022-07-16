const orderController = require('../controllers/orderController');
const express = require('express');
const router = express.Router();
const mwError = require("../MW/validatiomMW");
const authMW = require("../MW/authMW");
const { orderValidationAdd, orderValidationUpdate, orderValidationDelete, orderItemValidationDelete } = require("../MW/orderMW");

router.route("/orders")
    .get(orderController.getAllOrder)

    .post(authMW,
        (req, res, next) => {
            if (req.role === "user") {
                next();
            }
            else {
                res.status(403).json({
                    message: "You are not authorized to access this resource."
                });
            }
        }, orderValidationAdd, mwError, orderController.createNewOrder)
router.route("/order/:id")

    .all(authMW,
        (req, res, next) => {
            if (((req.role == "kitchen")
                || (req.role == "pilot")
                || (req.role == "user")
            )
                && (req.orders.includes(Number(req.params.id)))
            ) {
                console.log("req.orders: ", req.orders);
                console.log("order request", (req.orders.includes(Number(req.params.id))));
                next();
            }
            else {
                res.status(403).json({
                    message: "You are not authorized to access this resource."
                });
            }
        }

    )
    .get(mwError, orderController.getOrderById)
    .put(orderValidationUpdate, mwError, orderController.updateOrderById)
    .delete(orderValidationDelete, mwError, orderController.deleteOrderById)


router.route("/orderItems/:id")
    .delete(orderItemValidationDelete, mwError, orderController.deleteOrderItemById)




module.exports = router;


