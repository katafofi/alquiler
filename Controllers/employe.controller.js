const Employe = require("../Models/employe.model");

//request = req es la peticion que hace el cliente hacia el servidor
//response = res es la peticion que hace el servidor hacia el cliente
const CreateEmploye = async (req, res) => {
  const {
    Nombre,
    Apellido,
    Correo,
    Direccion,
    Cedula,
    Telefono,
    FechaNacimiento,
    
    Fecha,
    
  } = req.body;

  try {
    const employeCreate = await Employe.create({
      Nombre,
      Apellido,
      Correo,
      Direccion,
      Cedula,
      Telefono,
      FechaNacimiento,
      Fecha,
    });
    res.status(200).json(employeCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateEmploye = async (req, res) => {
  const { correo } = req.params;

  const {
    Nombre,
    Apellido,
    Correo,
    Direccion,
    Cedula,
    Telefono,
    FechaNacimiento,
    Fecha,
  } = req.body;

  try {
    const [result] = await Employe.update(
      {
        Nombre,
        Apellido,
        Correo,
        Direccion,
        Cedula,
        Telefono,
        FechaNacimiento,
        Fecha,
      },
      {
        where: { correo },
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

const DeleteEmploye = async (req, res) => {
  const { correo } = req.params;
  const result = await Employe.destroy({where: { correo } })
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

const DeleteMultiple = async(req, res) => {
  const correos = req.body
  const result = await Employe.destroy({where: { correo: correos }})
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

const FindOneEmployeById = async (req, res) => {
  const { correo } = req.params;
  try {
    const EmployeById = await Employe.findOne({ where: { correo } })
    
    if(EmployeById == 0){
        res.status(404).json({ error: "Empleado no encontrado"});
    }else{
        res.status(200).json({ message: EmployeById});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllEmploye = async (req, res) => {
  try {
    const EmployeAll = await Employe.findAll();
    res.status(200).json(EmployeAll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  FindAllEmploye,
  FindOneEmployeById,
  CreateEmploye,
  DeleteEmploye,
  UpdateEmploye,
  DeleteMultiple
};

module.exports = all;
