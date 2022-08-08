const express = require('express');
const router = express.Router();
const authMw = require('../MW/authMw');
const loginController = require('../controllers/loginController');

router.route('/login')
    // .get(
    //     (req, res, next) => {
    //         res.status(200).json({
    //             msg: {
    //                 user: "user",
    //                 admin: "admin"

    //             }
    //         })
    //     }
    // )
    .post(loginController.login);


module.exports = router;