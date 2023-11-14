const Categorys = require("../Models/categorys.model");

const CreateCategorys = async (req, res) => {
  const {
    Descripcion,    
  } = req.body;

  try {
    const CategorysCreate = await  Categorys.create({
        Descripcion,
    });
    res.status(200).json(CategorysCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateCategorys = async (req, res) => {
  const { IdCategoria } = req.params;

  const {
    Descripcion,
  } = req.body;

  try {
    const [result] = await Categorys.update(
      {
     Descripcion,
      },
      {
        where: { IdCategoria },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "Categoria no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "Catergoria actualizada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteCategorys = async (req, res) => {
  const { IdCategoria } = req.params;
  const result = await Categorys.destroy({where: { IdCategoria} })
  try {
    if(result == 0){
        res.status(404).json({ error: "Categoria eliminado o encontrado"});
    }else{
        res.status(201).json({ message: "categoria eliminada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleCategorys = async(req, res) => {
  const IdCategorias = req.body
  const result = await Categorys.destroy({where: { IdCategoria: IdCategorias }})
  try {
    if(result == 0){
        res.status(404).json({ error: "Categorias no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "Catgoriass eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneCategorysById = async (req, res) => {
  const { IdCategoria } = req.params;
  try {
    const result = await Categorys.findOne({ where: { IdCategoria} })
    
    if(result == 0){
        res.status(404).json({ error: "Categoria no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllCategorys = async (req, res) => {
  try {
    const result = await Categorys.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateCategorys,
  UpdateCategorys,
  DeleteCategorys,
  DeleteMultipleCategorys,
  FindOneCategorysById ,
  FindAllCategorys
};

module.exports = all;