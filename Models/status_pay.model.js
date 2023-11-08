const Sequelize = require('sequelize');
const database = require('../db.js');

const Status_pay = database.define('EstadosPagos', {
    IdEstadoPago: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },  
    descripcion:{
        type: Sequelize.STRING(100),
        allowNull: false,
    }
})
module.exports = Status_pay;