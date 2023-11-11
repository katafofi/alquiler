const Sequelize = require('sequelize');
const database = require('../db.js');

const AccesoriesInventory = database.define('InvetarioAccesorios', {
    IdInventarioAccesorios: {
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
    }
    })

module.exports = AccesoriesInventory;