const RentingRefunt = require("../Models/rental_refunt.model");

const CreateRentingRefunt = async (req, res) => {
  const {
    Descripcion,
    IdAlquiler,
    IdEmpleado
     
  } = req.body;

  try {
    const RentingRefuntCreate = await  RentingRefunt.create({
          
      Descripcion,
      IdAlquiler,
      IdEmpleado  
    });
    res.status(200).json(RentingRefuntCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateRentingRefunt= async (req, res) => {
  const { IdRegistroDevolucion} = req.params;

  const {
   
    Descripcion,
    IdAlquiler,
    IdEmpleado  
  } = req.body;

  try {
    const [result] = await RentingRefunt.update(
      {
        
    Descripcion,
    IdAlquiler,
    IdEmpleado  
      },
      {
        where: {IdRegistroDevolucion },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "RegistrosDevolucion no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "RegistrosDevolucion  actualizada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteRentingRefunt = async (req, res) => {
  const { IdRegistroDevolucion } = req.params;
  const result = await RentingRefunt.destroy({where: { IdRegistroDevolucion} })
  try {
    if(result == 0){
        res.status(404).json({ error: "RegistrosDevolucion  eliminado o encontrado"});
    }else{
        res.status(201).json({ message: "RegistrosDevolucion  eliminada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleRentingRefunt = async(req, res) => {
  const IdRegistroDevoluciones = req.body
  const result = await RentingRefunt.destroy({where: {IdRegistroDevolucion: IdRegistroDevoluciones }})
  try {
    if(result == 0){
        res.status(404).json({ error: "RegistrosDevolucion  no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "RegistrosDevolucion eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneRentingRefuntById = async (req, res) => {
  const { IdRegistroDevolucion } = req.params;
  try {
    const result = await RentingRefunt.findOne({ where: {IdRegistroDevolucion} })
    
    if(result == 0){
        res.status(404).json({ error: "RegistrosDevolucion  no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllRentingRefunt = async (req, res) => {
  try {
    const result = await RentingRefunt.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateRentingRefunt,
  UpdateRentingRefunt,
  DeleteRentingRefunt,
  DeleteMultipleRentingRefunt,
  FindOneRentingRefuntById,
  FindAllRentingRefunt 
};

module.exports = all;