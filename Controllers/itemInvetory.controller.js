const ItemInvetory = require("../Models/itemInventory.model");

const CreateItemInvetory = async (req, res) => {
  const {
    Cantidad,
    IdArticulo	    
  } = req.body;

  try {
    const ItemInvetoryCreate = await  ItemInvetory.create({
        Cantidad,
        IdArticulo
    });
    res.status(200).json(ItemInvetoryCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateItemInvetory = async (req, res) => {
  const { IdInventarioArticulo } = req.params;
  const { Cantidad, IdArticulo } = req.body;

  try {
    const [result] = await ItemInvetory.update(
      { Cantidad, IdArticulo },
      { where: { IdInventarioArticulo } }
    );

    if (result === 0) {
      res.status(404).json({ error: "Articulo no actualizado o encontrado" });
    } else {
      res.status(201).json({ message: "Inventario articulo actualizado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.name, message: error.message });
  }
};

const DeleteItemInvetory = async (req, res) => {
  const { IdInventarioArticulo } = req.params;

  try {
    const result = await ItemInvetory.destroy({ where: { IdInventarioArticulo } });

    if (result === 0) {
      res.status(404).json({ error: "Inventario_articulo no eliminado o encontrado" });
    } else {
      res.status(201).json({ message: "Inventario_articulo eliminado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.name, message: error.message });
  }
};



const DeleteMultipleItemInvetory = async(req, res) => {
  const IdInventarioArticulos = req.body
  const result = await ItemInvetory.destroy({where: { IdInventarioArticulo : IdInventarioArticulos }})
  try {
    if(result == 0){
        res.status(404).json({ error: "inventario_articulo no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "inventario_articulo eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneItemInvetoryById = async (req, res) => {
  const { IdInventarioArticulo } = req.params;
  try {
    const result = await ItemInvetory.findOne({ where: { IdInventarioArticulo} })
    
    if(result == 0){
        res.status(404).json({ error: "articulo_Inventario no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllItemInvetory = async (req, res) => {
  try {
    const result = await ItemInvetory.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateItemInvetory,
  UpdateItemInvetory,
  DeleteItemInvetory,
  DeleteMultipleItemInvetory,
  FindOneItemInvetoryById,
  FindAllItemInvetory
};

module.exports = all;