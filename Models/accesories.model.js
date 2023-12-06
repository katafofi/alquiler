const Sequelize = require('sequelize');
const database = require('../db.js');

const Accesories = database.define('Accesorios', {
    IdAccesorio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Descripcion: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
    },
    PrecioAccesorio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,


    }
    })
    module.exports = Accesories;
    