const NegativeRecord = require("../Models/negativeRecord.model");

const CreateNegativeRecord = async (req, res) => {
  const {
    IdOrdenCompra,
    IdEstadoRegistroNegativo
  } = req.body;

  try {
    const NegativeRecordCreate = await  NegativeRecord.create({
        IdOrdenCompra,
        IdEstadoRegistroNegativo
    });
    res.status(200).json(NegativeRecordCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateNegativeRecord = async (req, res) => {
  const { IdRegistroNegativo } = req.params;

  const {
    IdOrdenCompra,
    IdEstadoRegistroNegativo
  } = req.body;

  try {
    const [result] = await NegativeRecord.update(
      {
        IdOrdenCompra,
        IdEstadoRegistroNegativo
      },
      {
        where: { IdRegistroNegativo },
      }
    );
    if(result == 0){
        res.status(404).json({ error: " Registro negativo no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "Registro negativo actualizada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteNegativeRecord = async (req, res) => {
  const { IdRegistroNegativo } = req.params;
  const result = await NegativeRecord.destroy({where: { IdRegistroNegativo} })
  try {
    if(result == 0){
        res.status(404).json({ error: "Registro negativo eliminado o encontrado"});
    }else{
        res.status(201).json({ message: "Registro negativoa eliminada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleNegativeRecord = async(req, res) => {
  const IdRegistroNegativos = req.body
  const result = await NegativeRecord.destroy({where: { IdRegistroNegativo: IdRegistroNegativos }})
  try {
    if(result == 0){
        res.status(404).json({ error: "Registro negativo no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "Registro negativo eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneNegativeRecordById = async (req, res) => {
  const { IdRegistroNegativo } = req.params;
  try {
    const result = await NegativeRecord.findOne({ where: { IdRegistroNegativo} })
    
    if(result == 0){
        res.status(404).json({ error: "Registro negativo no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllNegativeRecord = async (req, res) => {
  try {
    const result = await NegativeRecord.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateNegativeRecord,
  UpdateNegativeRecord,
  DeleteNegativeRecord,
  DeleteMultipleNegativeRecord,
  FindOneNegativeRecordById ,
  FindAllNegativeRecord
};

module.exports = all;