const PuchaseOrder = require("../Models/purchase_order.model");

const createPurchaseOrder = async (req, res) => {
  const { FechaCompra, IdAlquiler, IdEmpleado } = req.body;

  try {
    const purchaseOrderCreate = await PuchaseOrder.create({
      FechaCompra,
      IdAlquiler,
      IdEmpleado,
    });
    res.status(201).json(purchaseOrderCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePurchaseOrder = async (req, res) => {
  const { IdOrdenCompra } = req.params;

  const { FechaCompra, IdAlquiler, IdEmpleado } = req.body;

  try {
    const [result] = await PuchaseOrder.update(
      {
        FechaCompra,
        IdAlquiler,
        IdEmpleado,
      },
      {
        where: { IdOrdenCompra },
      }
    );
    if (result === 0) {
      res.status(404).json({ error: "Orden de compra no actualizada o encontrada" });
    } else {
      res.status(200).json({ message: "Orden de compra actualizada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePurchaseOrder = async (req, res) => {
  const { IdOrdenCompra } = req.params;
  const result = await PuchaseOrder.destroy({ where: { IdOrdenCompra } });
  try {
    if (result === 0) {
      res.status(404).json({ error: "Orden de compra no eliminada o encontrada" });
    } else {
      res.status(200).json({ message: "Orden de compra eliminada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMultiplePurchaseOrder = async (req, res) => {
  const IdOrdenCompras = req.body;
  const result = await PuchaseOrder.destroy({ where: { IdOrdenCompra: IdOrdenCompras } });
  try {
    if (result === 0) {
      res.status(404).json({ error: "Orden de compra no eliminada o encontrada" });
    } else {
      res.status(200).json({ message: "Orden de compra eliminada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findOnePurchaseOrderById = async (req, res) => {
  const { IdOrdenCompra } = req.params;
  try {
    const result = await PuchaseOrder.findOne({ where: { IdOrdenCompra } });

    if (!result) {
      res.status(404).json({ error: "Orden de compra no encontrada" });
    } else {
      res.status(200).json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllPurchaseOrder = async (req, res) => {
  try {
    const result = await PuchaseOrder.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  deleteMultiplePurchaseOrder,
  findOnePurchaseOrderById,
  findAllPurchaseOrder,
};

module.exports = all;