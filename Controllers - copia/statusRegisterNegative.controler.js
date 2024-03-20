const StatusRegisterNegative  = require("../Models/status_register_negative.model");

const CreateStatusRegisterNegative = async (req, res) => {
  const {
    Descripcion

  } = req.body;

  try {
    const StatusRegisterNegativeCreate = await StatusRegisterNegative.create({
        Descripcion

    });
    res.status(200).json(StatusRegisterNegativeCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateStatusRegisterNegative  = async (req, res) => {
  const { IdEstadoRegistroNegativo} = req.params;

  const {
    Descripcion

  } = req.body;

  try {
    const [result] = await StatusRegisterNegative.update(
      {
        Descripcion
      
      },
      {
        where: { IdEstadoRegistroNegativo },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "estado regitro negativo no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "estado regitro negativo actualizado"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteStatusRegisterNegative = async (req, res) => {
  const { IdEstadoRegistroNegativo} = req.params;
  const result = await StatusRegisterNegative.destroy({where: { IdEstadoRegistroNegativo} })
  try {
    if(result == 0){
        res.status(404).json({ error: "estado regitro negativoeliminado no encontrado por favor valide bien los datos ingresados"});
    }else{
        res.status(201).json({ message: "estado regitro negativo eliminado con exito"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleStatusRegisterNegative = async(req, res) => {
  const IdEstadoRegistroNegativos = req.body
  const result = await StatusRegisterNegative.destroy({where: { IdEstadoRegistroNegativo: IdEstadoRegistroNegativos }})
  try {
    if(result == 0){
        res.status(404).json({ error: "estado regitro negativo no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "estado regitro negativo eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneStatusRegisterNegativeById = async (req, res) => {
  const { IdEstadoRegistroNegativo} = req.params;
  try {
    const result = await StatusRegisterNegative.findOne({ where: { IdEstadoRegistroNegativo} })
    
    if(result == 0){
        res.status(404).json({ error: "estado regitro negativono encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllStatusRegisterNegative = async (req, res) => {
  try {
    const result = await StatusRegisterNegative.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {

  CreateStatusRegisterNegative,
  UpdateStatusRegisterNegative,
  DeleteStatusRegisterNegative,
  DeleteMultipleStatusRegisterNegative,
  FindOneStatusRegisterNegativeById ,
  FindAllStatusRegisterNegative
  
};

module.exports = all;