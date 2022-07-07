const MenuController = require('../controllers/menuController');
const express = require('express');
const router = express.Router();
const mwError = require("../MW/validatiomMW");
const { menuValidationAdd, menuValidationUpdate, menuValidationdelete, menuValidationDeleteMenuItem } = require("../MW/menuMW");


router.route('/menu')
    .get(MenuController.getAllMenu)
    .post(menuValidationAdd, mwError, MenuController.createNewMenu)


router.route('/menu/:id')
    .get(mwError, MenuController.getMenuById)
    .put(menuValidationUpdate, mwError, MenuController.updateMenuById)
    .delete(menuValidationdelete, mwError, MenuController.deleteMenuById)



router.route("/menu/item/:id")

    .delete(menuValidationDeleteMenuItem, mwError, MenuController.deleteMenuItemById)




module.exports = router;    
