const AccesoriesInventory = require("../Models/accesories_inventory.model");

const CreateAccesoriesInventory = async (req, res) => {
  const { IdInventarioAccesori } = req.body;

  try {
    const AccesoriesInventoryCreate = await AccesoriesInventory.create({
      Cantidad,
      IdAccesorio,
    });
    res.status(200).json(SizesCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateAccesoriesInventory = async (req, res) => {
  const { IdInventarioAccesorio } = req.params;

  try {
    const [result] = await AccesoriesInventory.update(
      {
        Cantidad,
        IdAccesorio,
      },
      {
        where: { IdTalla },
      }
    );
    if (result == 0) {
      res.status(404).json({ error: "Inventario de accesorios actualizada " });
    } else {
      res.status(201).json({ message: "Inventario de accesorios actualizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteAccesoriesInventory = async (req, res) => {
  const { IdInventarioAccesorio } = req.params;
  const result = await AccesoriesInventory.destroy({
    where: { IdInventarioAccesorio },
  });
  try {
    if (result == 0) {
      res
        .status(404)
        .json({
          error: "Inventario de accesorios no encontrado por favor valide bien los datos ingresados",
        });
    } else {
      res
        .status(201)
        .json({ message: "tInventario de accesorios eliminado con exito" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleAccesoriesInventory = async (req, res) => {
  const IdInventarioAccesorios = req.body;
  const result = await AccesoriesInventory.destroy({
    where: { IIdInventarioAccesorio: IdInventarioAccesorios },
  });
  try {
    if (result == 0) {
      res
        .status(404)
        .json({
          error: "Inventario de accesorios no eliminados o encontrados",
        });
    } else {
      res.status(201).json({ message: "Inventario de accesorios eliminados" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneAccesoriesInventoryById = async (req, res) => {
  const { IdInventarioAccesorio } = req.params;
  try {
    const result = await AccesoriesInventory.findOne({
      where: { IdInventarioAccesorio },
    });

    if (result == 0) {
      res
        .status(404)
        .json({ error: "Inventario de accesorios  no encontrado" });
    } else {
      res.status(200).json({ message: result });
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
  FindAllAccesoriesInventory,
};

module.exports = all;
