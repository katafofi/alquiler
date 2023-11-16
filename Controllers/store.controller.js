
const Store = require("../Models/store.model");

const CreateStore = async (req, res) => {
  const {
        
    Nit, 
    Nombre, 
    Direccion, 
    Telefono,         
    Correo,         
    Logo 
   
  } = req.body;

  try {
    const StoreCreate = await  Store.create({
         
      Nit, 
      Nombre, 
      Direccion, 
      Telefono,         
      Correo,         
      Logo
  
    });
    res.status(200).json(StoreCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateStore = async (req, res) => {
  const { IdTienda } = req.params;

  const {
      
    Nit, 
    Nombre, 
    Direccion, 
    Telefono,         
    Correo,         
    Logo

  } = req.body;

  try {
    const [result] = await Store.update(
      {
        Nit, 
        Nombre, 
        Direccion, 
        Telefono,         
        Correo,         
        Logo
      },
      {
        where: { IdTienda },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "Tienda no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "Tienda actualizada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteStore = async (req, res) => {
  const { IdTienda } = req.params;
  const result = await Store.destroy({where: { IdTienda} })
  try {
    if(result == 0){
        res.status(404).json({ error: "Tienda eliminado o encontrado"});
    }else{
        res.status(201).json({ message: "cTienda eliminada"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleStore = async(req, res) => {
  const IdTiendas = req.body
  const result = await Store.destroy({where: { IdTienda: IdTiendas }})
  try {
    if(result == 0){
        res.status(404).json({ error: "Tiendasno eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "Tiendas eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneStoreById = async (req, res) => {
  const { IdTienda } = req.params;
  try {
    const result = await Store.findOne({ where: { IdTienda} })
    
    if(result == 0){
        res.status(404).json({ error: "Tienda no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllStore= async (req, res) => {
  try {
    const result = await Store.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateStore,
  UpdateStore,
  DeleteStore,
  DeleteMultipleStore,
  FindOneStoreById,
  FindAllStore
};

module.exports = all;