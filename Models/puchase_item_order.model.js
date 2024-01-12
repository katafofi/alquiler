const Sequelize = require('sequelize');
const database = require('../db.js');

const PuchareItemOrder = database.define('ArticulosOrdenCompra', {

    IdArticuloOrdenCompra: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Precio: {
        type: Sequelize.DECIMAL(10, 2),
        
    },

    IdOrdenCompra: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    IdArticulo: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
})

module.exports = PuchareItemOrder;