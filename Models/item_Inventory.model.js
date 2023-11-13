const Sequelize = require('sequelize');
const database = require('../db.js');

const ItemInvetory = database.define('InvetarioArticulos', {
    IdInventarioArticulo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    IdArticulo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    }
    })

module.exports = ItemInvetory;