async function syncModels() {
  const database = require("./db");
  //1
  const Employe = require("./Models/employe.model");
  const ExpensesEmploye = require("./Models/expensesEmploye.model");
  //2
  const Clients = require("./Models/clients.model");
  const Store = require("./Models/store.model");
  const RentingClientsStore = require("./Models/renting.model");

  //3
  const Employe = require("./Models/employe.model");
  const Renting = require("./Models/renting.model");
  const PuchaseOrderEmployeRenting = require("./Models/purchase_order.model");
  //4

  const Accesories = require("./Models/accesories.model");
  const AccesoriesInventoryAccesories= require("./Models/accesories_inventory.model");

  //5
  const Item = require("./Models/item.model");
  const ItemInventoryItem = require("./Models/accesories_inventory.model");

  //6
  const Accesories = require("./Models/accesories.model");
  const PuchaseOrder = require("./Models/purchase_order.model");
  const puchareAccesoriesAccesorioOrdenCompra = require("./Models/purchase_accesories_order.model");
  //7
  const Item = require("./Models/item.model");
  const PuchaseOrder = require("./Models/purchase_order.model");
  const PuchaseItemOrderPuchaseOrderItem = require("./Models/puchase_item_order.model");
  //8
  const Colors = require("./Models/colors.model");
  const Sizes = require("./Models/sizes.models");
  const Categorys = require("./Models/categorys.model");
  const ItemInvetory = require("./Models/item_Inventory.model");
  const ItemColorsSizesCategorysItemInventory = require("./Models/item.model");
  //9
  const StatusPay = require("./Models/status_pay.model");
  const PuchaseOrder = require("./Models/purchase_order.model");
  const PaymentType = require("./Models/payment_type.model");
  const PaymentStatusPayPucherOrderPaymentType = require("./Models/payments.models");
  //10
  const PuchaseOrder = require("./Models/purchase_order.model");
  const StatusRegisterNegative = require("./Models/status_register_negative.model.js");
  const PuchaseOrderStatusRegisterNegativeNegativeRecord = require("./Models/Negative_Record.model");

  //11
  const Renting = require("./Models/renting.model.js");
  const ReturnRegisterRenting = require("./Models/Return_Register.model.js");

  //Employe.hasOne(Employe, { as: 'Employe' })

  //TABLA relacional 1:M Eliminacion en cascada
  Employe.hasMany(ExpensesEmploye, {
    foreignKey: "IdEmpleado",
    onDelete: "RESTRICT",
  });

  Clients.hasMany(RentingClientsStore, {
    foreignKey: "IdCliente",
    onDelete: "RESTRICT",
  });

  Store.hasMany(RentingClientsStore, {
    foreignKey: "IdTienda",
    onDelete: "RESTRICT",
  });

  Employe.hasMany(PuchaseOrderEmployeRenting, {
    foreignKey: "IdEmpleado",
    onDelete: "RESTRICT",
  });
  Renting.hasMany(PuchaseOrderEmployeRenting, {
    foreignKey: "IdAlquiler",
    onDelete: "RESTRICT",
  });

  Accesories.hasMany(AccesoriesInventoryAccesories, {
    foreignKey: "IdAccesorio",
    onDelete: "RESTRICT",
  });

  Item.hasMany(ItemInventoryItem, {
    foreignKey: "IdArticulo",
    onDelete: "RESTRICT",
  });

  Accesories.hasMany(puchareAccesoriesAccesorioOrdenCompra, {
    foreignKey: "IdAccesorio",
    onDelete: "RESTRICT",
  });
  PuchaseOrder.hasMany(puchareAccesoriesAccesorioOrdenCompra, {
    foreignKey: "IdOrdenCompra",
    onDelete: "RESTRICT",
  });
  PuchaseOrder.hasMany(PuchaseItemOrderPuchaseOrderItem, {
    foreignKey: "IIdOrdenCompra",
    onDelete: "RESTRICT",
  });

  Item.hasMany(PuchaseItemOrderPuchaseOrderItem, {
    foreignKey: "IdArticulo",
    onDelete: "RESTRICT",
  });

  Colors.hasMany(ItemColorsSizesCategorysItemInventory, {
    foreignKey: "IdColor",
    onDelete: "RESTRICT",
  });
  Sizes.hasMany(ItemColorsSizesCategorysItemInventory, {
    foreignKey: "IdTalla",
    onDelete: "RESTRICT",
  });
  Categorys.hasMany(ItemColorsSizesCategorysItemInventory, {
    foreignKey: "IdCategoria",
    onDelete: "RESTRICT",
  });
  ItemInvetory.hasMany(ItemColorsSizesCategorysItemInventory, {
    foreignKey: "IdInevtario",
    onDelete: "RESTRICT",
  });
  StatusPay.hasMany(PaymentStatusPayPucherOrderPaymentType, {
    foreignKey: "IdEstadoPago",
    onDelete: "RESTRICT",
  });

  PuchaseOrder.hasMany(PaymentStatusPayPucherOrderPaymentType, {
    foreignKey: "IdOrdenPago",
    onDelete: "RESTRICT",
  });

  PaymentType.hasMany(PaymentStatusPayPucherOrderPaymentType, {
    foreignKey: "IdTipoPago",
    onDelete: "RESTRICT",
  });
  PuchaseOrder.hasMany(PuchaseOrderStatusRegisterNegativeNegativeRecord, {
    foreignKey: "IdOrdenCompra",
    onDelete: "RESTRICT",
  });
  StatusRegisterNegative.hasMany(
    PuchaseOrderStatusRegisterNegativeNegativeRecord,
    {
      foreignKey: "IdEstadoRegistroNegativo",
      onDelete: "RESTRICT",
    }
  );

  StatusRegisterNegative.hasMany(ReturnRegisterRenting, {
    foreignKey: "IdRentig",
    onDelete: "RESTRICT",
  });
  await database.sync({ force: true }); // false Crea la tabla si no existe
}

module.exports = syncModels;
