const Accesories = require("../Models/accesories.model");

const CreateAccesories = async (req, res) => {
  const {
    Descripcion,
    	    
  } = req.body;

  try {
    const AccesoriesCreate = await  Accesories.create({
        Descripcion,
    
    });
    res.status(200).json(AccesoriesCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateAccesories = async (req, res) => {
  const { IdAccesorio } = req.params;

  const {
    Descripcion,
    
  } = req.body;

  try {
    const [result] = await Accesories.update(
      {
        Descripcion,
        
      },
      {
        where: { IdAccesorio },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "accesorio no actualizado o encontrado"});
    }else{
        res.status(201).json({ message: "accesorio"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteAccesories = async (req, res) => {
  const { IdAccesorio } = req.params;
  const result = await Accesories.destroy({where: { IdAccesorio } })
  try {
    if(result == 0){
        res.status(404).json({ error: "inventario_accesorio eliminado o encontrado"});
    }else{
        res.status(201).json({ message: "inventario_accesorio"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleAccesories = async(req, res) => {
  const IdAccesorios = req.body
  const result = await Accesories.destroy({where: { IdAccesorio : IdAccesorios }})
  try {
    if(result == 0){
        res.status(404).json({ error: "inventario_accesorios no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "inventario_accesorios eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneAccesoriesById = async (req, res) => {
  const { IdAccesorio } = req.params;
  try {
    const result = await Accesories.findOne({ where: { IdAccesorio} })
    
    if(result == 0){
        res.status(404).json({ error: "Accesorio_Inventario no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllAccesories = async (req, res) => {
  try {
    const result = await Accesories.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateAccesories,
  UpdateAccesories,
  DeleteAccesories,
  DeleteMultipleAccesories,
  FindOneAccesoriesById ,
  FindAllAccesories
};

module.exports = all;