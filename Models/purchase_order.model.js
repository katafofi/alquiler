const Sequelize = require('sequelize');
const database = require('../db.js');


const PuchaseOrder = database.define('OrdenCompra', {
    IdOrdenCompra: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    FechaCompra: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    IdAlquiler: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    IdEmpleado: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    }

})
module.exports = PuchaseOrder;