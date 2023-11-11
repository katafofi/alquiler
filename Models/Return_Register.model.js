const Sequelize = require('sequelize');
const database = require('../db.js');

const ReturnRegister = database.define('RegistroDevolucion', {
    IdRegistroDevolucion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    IdAlquiler: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
  
},
{
   timestamps: false
})

module.exports = ReturnRegister;