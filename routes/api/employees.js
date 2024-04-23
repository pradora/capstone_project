// console.log(__dirname);
const express = require('express')
const router = express.Router();

const path = require('path')
const { 
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
} = require("../../controllers/employeesController")
const  {Admin, Editor} = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/')
    .get( getAllEmployees)

    .post(verifyRoles(Admin, Editor),createNewEmployee)
    .put(verifyRoles(Admin, Editor),updateEmployee)
    .delete(verifyRoles(Admin),deleteEmployee)

router.route('/:id')
    .get(getEmployee)

module.exports = router;