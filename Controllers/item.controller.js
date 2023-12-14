const Item = require("../Models/item.model");


const createItem = async (req, res) => {
  const { 
    Descripcion,
    IdColor,
    IdTalla,
    IdCategoria
    
   } = req.body;

  try {
    const ItemCreate = await Item.create({
      Descripcion,
      IdColor,
      IdTalla,
      IdCategoria
      
    });
    res.status(201).json(ItemCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  const { IdArticulo } = req.params;

  const {
    Descripcion,
    IdColor,
    IdTalla,
    IdCategoria
    
   } = req.body;

  try {
    const [result] = await Item.update(
      {
        Descripcion,
        IdColor,
        IdTalla,
        IdCategoria
      },
      {
        where: { IdArticulo },
      }
    );
    if (result === 0) {
      res.status(404).json({ error: "Artículo no actualizado o encontrado" });
    } else {
      res.status(200).json({ message: "Artículo actualizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { IdArticulo } = req.params;
  const result = await Item.destroy({ where: { IdArticulo } });
  try {
    if (result === 0) {
      res.status(404).json({ error: "Artículo no eliminado o encontrado" });
    } else {
      res.status(200).json({ message: "Artículo eliminado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMultipleItem = async (req, res) => {
  const IdArticulos = req.body;
  const result = await Item.destroy({ where: { IdArticulo: IdArticulos } });
  try {
    if (result === 0) {
      res.status(404).json({ error: "Artículos no eliminados o encontrados" });
    } else {
      res.status(200).json({ message: "Artículos eliminados" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findOneItemById = async (req, res) => {
  const { IdArticulo } = req.params;
  try {
    const result = await Item.findOne({ where: { IdArticulo } });

    if (!result) {
      res.status(404).json({ error: "Artículo no encontrado" });
    } else {
      res.status(200).json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllItem = async (req, res) => {
  try {
    const result = await Item.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  createItem,
  updateItem,
  deleteItem,
  deleteMultipleItem,
  findOneItemById,
  findAllItem,
};

module.exports = all;