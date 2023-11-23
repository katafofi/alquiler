const Sequelize = require('sequelize');
const database = require('../db.js');

const Sizes = database.define('Tallas', {
    IdTalla: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Descripcion: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    }
    })
    module.exports = Sizes;