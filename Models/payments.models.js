const Sequelize = require('sequelize');
const database = require('../db.js');

const Payments = database.define('Pagos', {
    IdPago: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   FechadPago: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    IdEstadoPago: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IdTipoPago: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IdOrdenCompra: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    })
    module.exports = Payments;