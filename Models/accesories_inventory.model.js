const Sequelize = require("sequelize");
const database = require("../db.js");

const AccesoriesInventory = database.define("InvetarioAccesorios", {
  IdInventarioAccesorio: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  IdAccesorio: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
});

module.exports = AccesoriesInventory;
