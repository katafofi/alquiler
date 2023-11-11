const Sequelize = require('sequelize');
const database = require('../db.js');

const ExpensesEmploye = database.define('GastosEmpleados', { 
    IdGastoEmpleado: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Descripcion: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    Monto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    Fecha: {
        type: Sequelize.DATE,
        allowNull: false
    },
    IdEmpleado: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
  
module.exports = ExpensesEmploye;