const ReturnRegister = require("../Models/Return_Register.model");

const CreateReturnRegisterg = async (req, res) => {
  const {
    IdAlquiler 
  } = req.body;

  try {
    const RentingReturnRegister= await  Renting.create({
        IdAlquiler 
    });
    res.status(200).json(ReturnRegisterCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateReturnRegister= async (req, res) => {
  const {  IdRegistroDevolucion} = req.params;

  const {
    IdAlquiler 
  } = req.body;

  try {
    const [result] = await ReturnRegister.update(
      {
        IdAlquiler  
      },
      {
        where: {  IdRegistroDevolucion },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "Alquiler no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "Alquiler  actualizada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteReturnRegister = async (req, res) => {
  const { IdRegistroDevolucion } = req.params;
  const result = await ReturnRegister.destroy({where: {  IdRegistroDevolucion} })
  try {
    if(result == 0){
        res.status(404).json({ error: "Alquiler  eliminado o encontrado"});
    }else{
        res.status(201).json({ message: "Alquiler  eliminada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleReturnRegister = async(req, res) => {
  const  IdRegistroDevolucions = req.body
  const result = await ReturnRegister.destroy({where: { IdRegistroDevolucion:  IdRegistroDevolucions }})
  try {
    if(result == 0){
        res.status(404).json({ error: "Alquiler  no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "Alquiler  eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneReturnRegisterById = async (req, res) => {
  const {  IdRegistroDevolucion} = req.params;
  try {
    const result = await ReturnRegister.findOne({ where: { IdRegistroDevolucion} })
    
    if(result == 0){
        res.status(404).json({ error: "Alquiler  no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllReturnRegister = async (req, res) => {
  try {
    const result = await ReturnRegister.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateReturnRegisterg,
  UpdateReturnRegister,
  DeleteReturnRegister,
  DeleteMultipleReturnRegister,
  FindOneReturnRegisterById,
  FindAllReturnRegister 
};

module.exports = all;