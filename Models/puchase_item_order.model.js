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
    IdOrdenCompra: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    IdArticulo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = PuchareItemOrder;