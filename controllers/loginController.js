const express = require('express');
const Login = require('../models/login');
const jwt = require("jsonwebtoken");

// login controller for login route 
const loginController = {
    login: (req, res, next) => {
        Login.findOne({ email: req.body.email })
            .then(data => {
                if (data) {
                    if (data.password === req.body.password) {
                        let token = jwt.sign({
                            id: data._id,
                            email: data.email,
                            role: data.role
                        }, process.env.secret, { expiresIn: "1h" });
                        res.status(200).json({
                            message: "Login successful",
                            token: token
                        });
                    }
                    else {
                        res.status(401).json({
                            message: "Invalid password"
                        });
                    }
                }
                else {
                    res.status(401).json({
                        message: "Invalid email"
                    });
                }
            }
            ).catch(error => {
                next(error)
            }
            )
    }
}
module.exports = loginController;