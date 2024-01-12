const Sequelize = require('sequelize');
const database = require('../db.js');

const statusRenting = database.define('EstadoAlquiler', {
    IdEstadoAlquiler: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },  
    Descripcion:{
        type: Sequelize.STRING(100),
        allowNull: false,
    }
})
module.exports = statusRenting;
