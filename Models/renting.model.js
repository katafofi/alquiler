const Sequelize = require("sequelize");
const database = require("../db.js");

const Renting = database.define("Alquiler", {
  IdAlquiler: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FechaInicialAlquiler: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  FechaFinlAlquiler: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  IdTienda: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  IdCliente: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
module.exports = Renting;