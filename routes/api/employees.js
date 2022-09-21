const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeesController');
const ROES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



router.route('/')
.get(employeeController.getAllEmployees)
.post(verifyRoles(ROES_LIST.Admin, ROES_LIST.Editor), employeeController.createNewEmployee)
.put(verifyRoles(ROES_LIST.Admin, ROES_LIST.Editor), employeeController.updateEmployee)
.delete(verifyRoles(ROES_LIST.Admin), employeeController.deleteEmployee)

router.route('/:id').get(employeeController.getEmployee)


module.exports = router;