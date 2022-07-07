const { body, param, query } = require("express-validator");

exports.menuValidationAdd = [
    body("kitchen")
        .notEmpty().withMessage("kitchen is required")
        .isString().withMessage("kitchen must be a string")
        .isLength({ min: 1, max: 50 })
        .withMessage("kitchen must be between 3 and 50 characters long"),
    body("menuItems")
        .notEmpty().withMessage("menuItems is required")
        .isNumeric().withMessage("menuItems must be a number")
        .isLength({ min: 1, max: 5 })
        .withMessage("menuItems must be between 1 and 5 digits long"),
]

exports.menuValidationUpdate = [
    body("kitchen")
        .optional()
        .isString().withMessage("kitchen must be a string")
        .isLength({ min: 3, max: 50 })
        .withMessage("kitchen must be between 3 and 50 characters long"),
    body("menuItems")
        .optional()
        .isNumeric().withMessage("menuItems must be a number")
        .isLength({ min: 1, max: 5 })
        .withMessage("menuItems must be between 1 and 5 digits long"),
]
exports.menuValidationdelete = [
    param("id")
        .notEmpty().withMessage("id is required")
        .isString().withMessage("id must be a string")
        .isLength({ min: 3, max: 50 })
        .withMessage("id must be between 3 and 50 characters long"),
]

exports.menuValidationDeleteMenuItem = [
    param("id")
        .notEmpty().withMessage("id is required")
        .isString().withMessage("id must be a string")
        .isLength({ min: 3, max: 50 })
        .withMessage("id must be between 3 and 50 characters long"),
]