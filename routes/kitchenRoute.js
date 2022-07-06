const express = require("express");
const KitchenController = require("./../controllers/kitchenControllers")
const router = express.Router();
const mwError = require("../MW/validatiomMW");
const { kitchenValidationAdd, kitchenValidationUpdate, kitchenValidationDelete, kitchenValidationDeleteOrder } = require("../MW/kitchenMW");


router.route("/kitchen/:id")
    .get(KitchenController.getkitchenById)
    .put(kitchenValidationUpdate, mwError, KitchenController.updateKitchen)
    .delete(
        kitchenValidationDelete,
        mwError,
        KitchenController.deleteKitchen)

router.route("/kitchen")
    .get(mwError, KitchenController.getAllkitchen)

    .post(kitchenValidationAdd, mwError, KitchenController.createNewKitchen)




router.route("/kitchenOrders/:id")
    .get(KitchenController.getKitchenOrders)
    .delete(kitchenValidationDeleteOrder,
        mwError, KitchenController.deleteKitchenOrders)



module.exports = router