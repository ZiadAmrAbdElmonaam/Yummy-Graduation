const express = require('express');
const router = express.Router();
const authMw = require('../MW/authMw');

router.route('/login')
    .post(authMw, (req, res) => {
        res.status(200).json({
            message: "Login successful"
        });
    }
    );
