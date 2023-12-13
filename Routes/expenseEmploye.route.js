const router = require('express').Router();
const expenseEmployeController = require('../Controllers/expenseEmploye.controller');

router.get('/', expenseEmployeController.FindAllExpenseEmploye)

router.get('/:name', expenseEmployeController.FindAllExpenseEmployeExport)

router.post('/', expenseEmployeController.CreateExpenseEmploye)

router.patch('/:IdGastoEmpleado', expenseEmployeController.UpdateExpenseEmploye)

router.delete('/:IdGastoEmpleado', expenseEmployeController.DeleteExpenseEmploye)

router.post('/delete/all', expenseEmployeController.DeleteMultipleExpenseEmploye)

router.get('/:IdGastoEmpleado', expenseEmployeController.FindOneExpenseEmployeById)

module.exports = router