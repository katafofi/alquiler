const Sequelize = require('sequelize');
const database = require('../db.js');

const Colors = database.define('Colores', {
    IdColor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Descripcion: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
    }
    })
    module.exports = Colors;