const mongoose = require("mongoose");
require("../models/orderSchema");
const Order = mongoose.model("orders");

module.exports.getAllOrder = (req, res, next) => {
    Order.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
}
module.exports.getOrderById = (req, res, next) => {
    id = req.params.id
    Order.findById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
}
module.exports.createNewOrder = (req, res, next) => {
    let orderObject = new Order({
        totalPrice: req.body.totalPrice,
        userid: req.body.userid,
        kitchen: req.body.kitchen,
        orderItems: req.body.orderItems
    });
    orderObject.save()
        .then((data) => {
            res.status(201).json({ "data": data });
        })
        .catch(error => next(error))
}


module.exports.updateOrderById = (req, res, next) => {
    Order.updateOne({ _id: req.params.id },
        {
            $push: {
                orderItems: {
                    $each: req.body.orderItems
                }
            },
            $set: {
                totalPrice: req.body.totalPrice,
                userid: req.body.userid,
                kitchen: req.body.kitchen,
                deliverypilot: req.body.deliverypilot,
                kitchenOrderStatus: req.body.kitchenOrderStatus,
                pilotOrderStatus:req.body.pilotOrderStatus
            }

        })

        .then(data => {
            // console.log(data.modifiedCount);
            if (data.modifiedCount == 0) next(new Error("Item not found"));
            else
                res.status(200).json({ data: "updated" })
        })
        .catch(error => { next(error) })

}
module.exports.deleteOrderById = (req, res, next) => {
    Order.deleteOne({ _id: req.params.id })
        .then(data => {
            if (data.deletedCount == 0) next(new Error("Item not found"));
            else
                res.status(200).json({ data: "deleted" })
        })
        .catch(error => { next(error) })
}

module.exports.deleteOrderItemById = (req, res, next) => {
    Order.updateOne({ _id: req.params.id },
        {
            $pull: {
                orderItems: {
                    $in: req.body.orderItems
                }
            }
        })
        .then(data => {
            if (data.modifiedCount == 0) next(new Error("Item not found"));
            else
                res.status(200).json({ data: "deleted" })
        })
        .catch(error => { next(error) })
}




// Controller Poplulate orders


