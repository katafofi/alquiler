const Sequelize = require('sequelize');
const database = require('../db.js');

const NegativeRecord = database.define('RegistroNegativo', {
    IdRegistroNegativo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    IdCliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    IdEstadoRegistroNegativo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IdOrdenCompra: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    IdAlquiler: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    
},
{
   timestamps: false
})
module.exports = NegativeRecord;