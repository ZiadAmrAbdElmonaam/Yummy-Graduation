const ItemController = require('../controllers/itemController');
const express = require('express');
const router = express.Router();
const mwError = require("../MW/validatiomMW");
const { itemValidationAdd, itemValidationUpdate, itemValidationDelete } = require("../MW/itemMW");



router.route('/item')
    .get(mwError, ItemController.getAllItem)
    .post(itemValidationAdd, mwError, ItemController.createNewItem)


router.route('/menuItem/:id')
    .get(mwError, ItemController.getItemById)
    .put(itemValidationUpdate, mwError, ItemController.updateItemById)
    .delete(itemValidationDelete, mwError, ItemController.deleteItemById)

router.route("/menu/itemName/:itemName")
    .get(mwError, ItemController.getItemByName)

router.route("/menu/item/catogery/:catogery")
    .get(mwError, ItemController.getItemByCatogery)



module.exports = router;    
