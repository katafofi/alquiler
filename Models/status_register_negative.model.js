const Sequelize = require('sequelize');
const database = require('../db.js');

const StatusRegisterNegative = database.define('EstadoRegistroNegativo',{
    
        IdEstadoRegistroNegativo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },    
        Descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
       
      
        

})
module.exports = StatusRegisterNegative;