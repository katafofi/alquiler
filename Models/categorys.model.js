const Sequelize = require("sequelize");
const database = require("../db.js");

const Categorys = database.define("Categorias", {
  IdCategoria: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Descripcion: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
  },

});
module.exports = Categorys;
