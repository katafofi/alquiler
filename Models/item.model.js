const Sequelize = require("sequelize");
const database = require("../db.js");

const Item = database.define("Articulo", {
  IdArticulo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Descripcion: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  IdInventarioArticulo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  IdColor: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  IdTalla: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  IdCategoria: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
module.exports = Item;
