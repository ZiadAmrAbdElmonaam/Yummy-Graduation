const mongoose = require("mongoose")
const autoIncrement = require("mongoose-sequence")(mongoose);

const orderschema = new mongoose.Schema({

    _id: { type: Number },
    totalPrice: { type: Number, required: true, ref: "items", default: 0 },
    orderStatus: { type: String, required: true, default: "pending", enum: ["pending", "accepted", "inProgress", "rejected", "completed"] },
    orderDate: { type: Date, default: Date.now, required: true },
    orderfees: { type: Number, default: 20 },
    userid: { type: Number, ref: "users", required: true },
    kitchen: { type: Number, ref: "kitchens", required: true },
    deliverypilot: { type: Number, ref: "pilots", required: true },
    orderItems: [{ type: Number, ref: "items", required: true }],
})

//2- mapping
orderschema.plugin(autoIncrement, { id: "orderCounter" });
module.exports = mongoose.model("orders", orderschema)