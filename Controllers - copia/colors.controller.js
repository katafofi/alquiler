const Colors = require("../Models/colors.model");

const CreateColors = async (req, res) => {
  const {
    Descripcion
  } = req.body;

  try {
    const ColorsCreate = await  Colors.create({
      Descripcion
    });
    res.status(200).json(ColorsCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateColors = async (req, res) => {
  const { IdColor } = req.params;

  const {
    Descripcion
  } = req.body;

  try {
    const [result] = await Colors.update(
      {
        Descripcion
      },
      {
        where: { IdColor },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "color no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "color actualizado"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteColors = async (req, res) => {
  const { IdColor } = req.params;
  const result = await Colors.destroy({where: { IdColor} })
  try {
    if(result == 0){
        res.status(404).json({ error: "color eliminado no encontrado por favor valide bien los datos ingresados"});
    }else{
        res.status(201).json({ message: "Color eliminado con exito"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleColors = async(req, res) => {
  const Idcolores = req.body
  const result = await Colors.destroy({where: { IdColor: Idcolores }})
  try {
    if(result == 0){
        res.status(404).json({ error: "colores no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "Ccolores eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneColorsById = async (req, res) => {
  const { IdColor } = req.params;
  try {
    const result = await Colors.findOne({ where: { IdColor} })
    
    if(result == 0){
        res.status(404).json({ error: "Color  no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllColors = async (req, res) => {
  try {
    const result = await Colors.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateColors,
  UpdateColors,
  DeleteColors,
  DeleteMultipleColors,
  FindOneColorsById ,
  FindAllColors
};

module.exports = all;