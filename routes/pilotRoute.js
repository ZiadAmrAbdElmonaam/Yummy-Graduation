const express = require("express");
const { body, param, query } = require("express-validator");
const mwError = require("../MW/validatiomMW");
const router = express.Router();
const pilotController = require("../controllers/pilotController");
const authMw = require("../MW/authMw");
const { pilotValidationDeleteOrder, pilotsValidationAdd, pilotsValidationUpdate, pilotsValidationDelete } = require("../MW/pilotMW");

//image 

// get all pilots
router.route("/pilot")

    .get(pilotController.getAllpilots)


// sign up pilots
router.route("/pilot/signUp")

    .post(pilotsValidationAdd, mwError, pilotController.addPilot)

// get pilot by nationalID
router.route("/pilot/:nationalID")
    .all(authMw, (req, res, next) => {
        if (req.role == "pilot" && req.id == req.params.nationalID) {
            next();
        }
        else {
            let error = new Error("not authorized");
            error.status = 403;
            next(error);
        }
    }
    )
    .get(pilotController.getpilotById)

    .put(pilotsValidationUpdate, mwError, pilotController.updateById)
    .delete(pilotsValidationDelete, mwError, pilotController.deleteById)

router.route("/pilotOrders/:nationalID")
    .all(authMw, (req, res, next) => {
        if (req.role == "pilot" && req.id == req.params.nationalID) {
            next();
        }
        else {
            let error = new Error("not authorized");
            error.status = 403;
            next(error);
        }
    }
    )
    .get(pilotController.getPilotOrders)
    .delete(pilotValidationDeleteOrder, mwError, pilotController.deletePilotOrder)



module.exports = router; 