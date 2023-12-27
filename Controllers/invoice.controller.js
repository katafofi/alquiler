const dbItem = require("../Models/item.model");
const dbAccesories = require("../Models/accesories.model");
const dbPurchaseAccesoriesOrder = require("../Models/purchase_accesories_order.model");
const dbPurchareItemOrder = require("../Models/puchase_item_order.model");
const dbPurchaseOrder = require("../Models/purchase_order.model");
const dbPayments = require("../Models/payments.models");
const dbEmployees = require("../Models/employe.model");
const dbRenting = require("../Models/renting.model");
const dbClients = require("../Models/clients.model");

const findInvoiceByPurchaseId = async (req, res) => {
  const { IdOrdenCompra } = req.params;
  try {
    const accesories = await dbAccesories.findAll();
    const item = await dbItem.findAll();
    const employees = await dbEmployees.findAll();
    let payments = await dbPayments.findAll({ where: { IdOrdenCompra } });
    let resultPurchaseOrder = await dbPurchaseOrder.findOne({ where: { IdOrdenCompra } });
    let resultPurchaseAccesoriesOrder = await dbPurchaseAccesoriesOrder.findAll({ where: { IdOrdenCompra } });
    let resultPurchareItemOrder = await dbPurchareItemOrder.findAll({ where: { IdOrdenCompra } });
    if (!resultPurchaseAccesoriesOrder && !resultPurchaseOrder && !resultPurchareItemOrder) {
      res.status(404).json({ error: "Factura no encontrada" });
    } else {
      let rent = await dbRenting.findOne({ where: { IdAlquiler: resultPurchaseOrder.IdAlquiler } });
      rent = await JSON.parse(JSON.stringify(rent))
      let client = await dbClients.findOne({ where: { IdCliente: rent.IdCliente } });
      client = await JSON.parse(JSON.stringify(client))
      delete client['FotoDocumento']
      delete client['FotoServicioPublico']
      resultPurchaseOrder = await JSON.parse(JSON.stringify(resultPurchaseOrder))
      resultPurchaseAccesoriesOrder = await JSON.parse(JSON.stringify(resultPurchaseAccesoriesOrder))
      resultPurchareItemOrder = await JSON.parse(JSON.stringify(resultPurchareItemOrder))
      payments = await JSON.parse(JSON.stringify(payments))
      resultPurchaseOrder.Cliente = client
      resultPurchaseOrder.FechaInicialAlquiler = rent.FechaInicialAlquiler
      resultPurchaseOrder.FechaFinlAlquiler = rent.FechaFinlAlquiler
      employees.forEach(el => {
        if (el.IdEmpleado === resultPurchaseOrder.IdEmpleado) {
          resultPurchaseOrder.NombreEmpleado = `${el.Nombre} ${el.Apellido}`
        }
      });
      accesories.forEach(el => {
        resultPurchaseAccesoriesOrder.forEach(element => {
          if (el.IdAccesorio === element.IdAccesorio) {
            element.Descripcion = el.Descripcion
          }
        });
      });
      item.forEach(el => {
        resultPurchareItemOrder.forEach(element => {
          if (el.IdArticulo === element.IdArticulo) {
            element.Descripcion = el.Descripcion
          }
        });
      });
      res.status(200).json({ ...resultPurchaseOrder, payments, resultPurchareItemOrder, resultPurchaseAccesoriesOrder });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDefaultResponse = (req, res) => {
  res.status(200).json({ message: "Porfavor ingrese un ID de orden compra" });
};

module.exports = {
  findInvoiceByPurchaseId,
  getDefaultResponse,
};
