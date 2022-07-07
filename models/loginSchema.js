const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const loginSchema = new mongoose.Schema({
    // ref to user and kitchen 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    kitchen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kitchen"
    },
    // role of user
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
}
)

loginSchema.plugin(AutoIncrement, { id: "loginCounter" });
module.exports = mongoose.model("login", loginSchema)

