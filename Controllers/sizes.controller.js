const Sizes = require("../Models/sizes.models");

const CreateSizes = async (req, res) => {
  const {
    Descripcion
  } = req.body;

  try {
    const SizesCreate = await  Sizes.create({
      Descripcion
    });
    res.status(200).json(SizesCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateSizes = async (req, res) => {
  const { IdTalla } = req.params;

  const {
    Descripcion
  } = req.body;

  try {
    const [result] = await Sizes.update(
      {
        Descripcion
      },
      {
        where: { IdTalla },
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

const DeleteSizes = async (req, res) => {
  const { IdTalla } = req.params;
  const result = await Sizes.destroy({where: { IdTalla} })
  try {
    if(result == 0){
        res.status(404).json({ error: "tallaeliminado no encontrado por favor valide bien los datos ingresados"});
    }else{
        res.status(201).json({ message: "talla eliminado con exito"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleSizes = async(req, res) => {
  const IdTallas = req.body
  const result = await Sizes.destroy({where: { IdTalla: IdTallas }})
  try {
    if(result == 0){
        res.status(404).json({ error: "talla no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "talla eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneSizesById = async (req, res) => {
  const { IdTalla } = req.params;
  try {
    const result = await Sizes.findOne({ where: { IdTalla} })
    
    if(result == 0){
        res.status(404).json({ error: "Color  no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllSizes = async (req, res) => {
  try {
    const result = await Sizes.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateSizes,
  UpdateSizes,
  DeleteSizes,
  DeleteMultipleSizes,
  FindOneSizesById ,
  FindAllSizes
};

module.exports = all;
