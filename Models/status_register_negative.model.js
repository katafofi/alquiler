const Sequelize = require('sequelize');
const database = require('../db.js');

const StatusRegisterNegative = database.define('EstadoRegistroNegativo',{
    
        IdEstadoRegistroNegativo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },    
        CantidadDisponible: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
       
        IdAccesorio: {
            type: Sequelize.INTEGER,
            allowNull: false
        }

})
module.exports = StatusRegisterNegative;