const ExpenseEmploye = require("../Models/expensesEmploye.model");

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

const all = {
  CreateExpenseEmploye,
  UpdateExpenseEmploye,
  DeleteExpenseEmploye,
  DeleteMultipleExpenseEmploye,
  FindOneExpenseEmployeById,
  FindAllExpenseEmploye
};

module.exports = all;
