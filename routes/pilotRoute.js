const express = require("express");
const { body, param, query } = require("express-validator");
const mwError = require("../MW/validatiomMW");
const router = express.Router();
const pilotController = require("../controllers/pilotController");
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
    .get(pilotController.getpilotById)

    .put(pilotsValidationUpdate, mwError, pilotController.updateById)
    .delete(pilotsValidationDelete, mwError, pilotController.deleteById)

router.route("/pilotOrders/:nationalID")
    .get(pilotController.getPilotOrders)
    .delete(pilotValidationDeleteOrder, mwError, pilotController.deletePilotOrder)



module.exports = router; 