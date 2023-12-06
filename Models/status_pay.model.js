const Sequelize = require('sequelize');
const database = require('../db.js');

const Statuspay = database.define('EstadoPagos', {
    IdEstadoPago: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },  
    Descripcion:{
        type: Sequelize.STRING(100),
        allowNull: false,
    }
})
module.exports = Statuspay;
