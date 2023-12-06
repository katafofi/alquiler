const Sequelize = require('sequelize');
const database = require('../db.js');

const NegativeRecord = database.define('RegistroNegativo', {
    IdRegistroNegativo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    IdOrdenCompra: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    IdEstadoRegistroNegativo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
},
{
   timestamps: false
})
module.exports = NegativeRecord;