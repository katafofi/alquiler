const ExpenseEmploye = require("../Models/expensesEmploye.model");
const dataToExcel = require("../provider/dataToExcel");
const formattedDate = require("../provider/formatDate");

const CreateExpenseEmploye = async (req, res) => {
  const {
    Descripcion,
    Monto,	
    IdEmpleado
  } = req.body;

  try {
    const expenseEmployeCreate = await ExpenseEmploye.create({
        Descripcion,
        Monto,	
        IdEmpleado
    });
    res.status(200).json(expenseEmployeCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateExpenseEmploye = async (req, res) => {
  const { IdGastoEmpleado } = req.params;

  const {
    Descripcion,
    Monto,	
    IdEmpleado
  } = req.body;

  try {
    const [result] = await ExpenseEmploye.update(
      {
        Descripcion,
        Monto,	
        IdEmpleado
      },
      {
        where: { IdGastoEmpleado },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "Empleado no actualizado o encontrado"});
    }else{
        res.status(201).json({ message: "Empleado actualizado"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteExpenseEmploye = async (req, res) => {
  const { IdGastoEmpleado } = req.params;
  const result = await ExpenseEmploye.destroy({where: { IdGastoEmpleado } })
  try {
    if(result == 0){
        res.status(404).json({ error: "Empleado no eliminado o encontrado"});
    }else{
        res.status(201).json({ message: "Empleado eliminado"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleExpenseEmploye = async(req, res) => {
  const IdGastosEmpleados = req.body
  const result = await ExpenseEmploye.destroy({where: { IdGastoEmpleado: IdGastosEmpleados }})
  try {
    if(result == 0){
        res.status(404).json({ error: "Empleados no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "Empleados eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneExpenseEmployeById = async (req, res) => {
  const { IdGastoEmpleado } = req.params;
  try {
    const result = await ExpenseEmploye.findOne({ where: { IdGastoEmpleado } })
    
    if(result == 0){
        res.status(404).json({ error: "Empleado no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllExpenseEmploye = async (req, res) => {
  try {
    const result = await ExpenseEmploye.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const handleGetEmploye = async (id) => {
  try {
    const form = "employe";
    const URL = "http://localhost:";
    const PORT = "3003";
    const response = await fetch(`${URL}${PORT}/${form}/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};

const FindAllExpenseEmployeExport = async (req, res) => {
  try {
    const { name } = req.params

    const result = await ExpenseEmploye.findAll();
    const data = []

    await Promise.all(
      result.map(async (expense) => {
        const employe = await handleGetEmploye(expense.IdEmpleado)

        const formattedExpense = { 
          ...expense.dataValues, 
          IdEmpleado: employe.message.Nombre + ' ' + employe.message.Apellido,
          createdAt: formattedDate(expense.dataValues.createdAt),
          updatedAt: formattedDate(expense.dataValues.updatedAt)
        }

        data.push(formattedExpense)
        return formattedExpense
      })
    )

    dataToExcel(data, name)
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateExpenseEmploye,
  UpdateExpenseEmploye,
  DeleteExpenseEmploye,
  DeleteMultipleExpenseEmploye,
  FindOneExpenseEmployeById,
  FindAllExpenseEmploye,
  FindAllExpenseEmployeExport
};

module.exports = all;
