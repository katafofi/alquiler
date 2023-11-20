const Sequelize = require('sequelize');
const database = require('../db.js');

const Store = database.define('Tiendas', {
    IdTienda: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nit: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    Nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    Direccion: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    Telefono: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    Correo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    Logo: {
        type: Sequelize.STRING(250),
        allowNull: false,
      
    }

})

module.exports = Store;