const AccesoriesInventory = require("../Models/accesoriesInventory.model");

const CreateAccesoriesInventory = async (req, res) => {
  const {
    Cantidad,
    IdAccesorio 	    
  } = req.body;

  try {
    const AccesoriesInventoryCreate = await  AccesoriesInventory.create({
      Cantidad,
      IdAccesorio 
    });
    res.status(200).json(AccesoriesInventoryCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateAccesoriesInventory = async (req, res) => {
  const { IdInventarioAccesorio } = req.params;

  const {
    Cantidad,
    IdAccesorio 
  } = req.body;

  try {
    const [result] = await AccesoriesInventory.update(
      {
        Cantidad,
        IdAccesorio 
      },
      {
        where: { IdInventarioAccesorio },
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

const DeleteAccesoriesInventory = async (req, res) => {
  const { IdInventarioAccesorio } = req.params;
  const result = await AccesoriesInventory.destroy({where: { IdInventarioAccesorio } })
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

const DeleteMultipleAccesoriesInventory = async(req, res) => {
  const IdInventarioAccesorios = req.body
  const result = await AccesoriesInventory.destroy({where: { IdInventarioAccesorio : IdInventarioAccesorios }})
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

const FindOneAccesoriesInventoryById = async (req, res) => {
  const { IdInventarioAccesorio } = req.params;
  try {
    const result = await AccesoriesInventory.findOne({ where: { IdInventarioAccesorio} })
    
    if(result == 0){
        res.status(404).json({ error: "Accesorio_Inventario no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllAccesoriesInventory = async (req, res) => {
  try {
    const result = await AccesoriesInventory.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateAccesoriesInventory,
  UpdateAccesoriesInventory,
  DeleteAccesoriesInventory,
  DeleteMultipleAccesoriesInventory,
  FindOneAccesoriesInventoryById,
  FindAllAccesoriesInventory
};

module.exports = all;