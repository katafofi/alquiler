const Sequelize = require("sequelize");
const database = require("../db.js");

const EmployeStatus = database.define(
  "EstadoEmpleado",
  {
    IdEstadoEmpleado: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Descripcon: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = EmployeStatus;
