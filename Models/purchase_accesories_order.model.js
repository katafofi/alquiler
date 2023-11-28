const Sequelize = require('sequelize');
const database = require('../db.js');

const PuchaseAccesoriesOrder = database.define('AccesoriosOrdenCompra', {

    IdAccesorioOrdenCompra: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    IdOrdenCompra: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    IdAccesorio: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})
module.exports = PuchaseAccesoriesOrder;