const express = require("express");
const server = express();
const mongoose = require("mongoose")
const morgan = require("morgan");
const pilotRoute = require("./routes/pilotRoute");
const userRoute = require("./routes/userRoute");
const kitchenRoute = require("./routes/kitchenRoute");
const menuRoute = require("./routes/menuRoute");
const itemRoute = require("./routes/itemRoute");
const orderRoute = require("./routes/orderRoute");
const loginRoute = require("./routes/loginRoute");
const cors = require("cors");
require("dotenv").config();




//connect database
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("db Connected ")
        server.listen(process.env.port || 8080, () => {
            console.log("Hi iam listening to Server with port 8080")
        });
    })
    .catch(() => {
        console.log("db connection error")
    })



// use morgan middleWare
server.use(morgan('dev', {
    skip: (req, res) => { res.statusCode < 400 }
}));

server.get('/', (req, res) => {
    res.send('hello from main page')
});
//cors 
server.use(cors({}))

//end Routes
server.use([express.json(), express.urlencoded({ extended: false })])
server.use([pilotRoute, userRoute, kitchenRoute, menuRoute, itemRoute, orderRoute, loginRoute])



// general middleware not found
server.use((req, res) => {
    res.status(404).json({ message: "Not Found" })
});

//middleware error handler
server.use((error, req, res, next) => {
    let status = error.status || 500;
    res.status(status).json({ message: "internal Error " + error });
})
