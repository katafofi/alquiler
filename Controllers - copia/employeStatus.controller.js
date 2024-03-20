const EmployeStatus = require("../Models/employe_status.model");

const createEmployeStatus = async (req, res) => {
  const { Descripcion } = req.body;

  try {
    const employeStatusCreate = await EmployeStatus.create({
      Descripcion,
    });
    res.status(201).json(employeStatusCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEmployeStatus = async (req, res) => {
  const { IdEstadoEmpleado } = req.params;
  const { Descripcion } = req.body;

  try {
    const [result] = await EmployeStatus.update(
      { Descripcion },
      { where: { IdEstadoEmpleado } }
    );
    if (result === 0) {
      res.status(404).json({ error: "Estado de empleado no actualizado o encontrado" });
    } else {
      res.status(200).json({ message: "Estado de empleado actualizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployeStatus = async (req, res) => {
  const { IdEstadoEmpleado } = req.params;
  try {
    const result = await EmployeStatus.destroy({ where: { IdEstadoEmpleado } });
    if (result === 0) {
      res.status(404).json({ error: "Estado de empleado no eliminado o encontrado" });
    } else {
      res.status(200).json({ message: "Estado de empleado eliminado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMultipleEmployeStatus = async (req, res) => {
  const IdEstadoEmpleados = req.body;
  try {
    const result = await EmployeStatus.destroy({ where: { IdEstadoEmpleado: IdEstadoEmpleados } });
    if (result === 0) {
      res.status(404).json({ error: "Estados de empleado no eliminados o encontrados" });
    } else {
      res.status(200).json({ message: "Estados de empleado eliminados" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findOneEmployeStatusById = async (req, res) => {
  const { IdEstadoEmpleado } = req.params;
  try {
    const result = await EmployeStatus.findOne({ where: { IdEstadoEmpleado } });
    if (!result) {
      res.status(404).json({ error: "Estado de empleado no encontrado" });
    } else {
      res.status(200).json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllEmployeStatus = async (req, res) => {
  try {
    const result = await EmployeStatus.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const employeStatusController = {
  createEmployeStatus,
  updateEmployeStatus,
  deleteEmployeStatus,
  deleteMultipleEmployeStatus,
  findOneEmployeStatusById,
  findAllEmployeStatus,
};

module.exports = employeStatusController;