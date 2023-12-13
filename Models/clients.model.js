const Sequelize = require('sequelize');
const database = require('../db.js');

const Clients = database.define('Clientes', {

    IdCliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    Nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    Apellido: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    Cedula: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    Correo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    Direccion: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    Telefono: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    ReferenciaPersonalNombre: { 
        type: Sequelize.STRING(50),
        allowNull: false
    },
    ReferenciaPersonalTelefono: { 
        type: Sequelize.STRING(20),
        allowNull: false
        
    },
    FotoDocumento: {
        type: Sequelize.BLOB('long'), 
       
    },
    FotoServicioPublico: {
        type: Sequelize.BLOB('long'), 
        
    },
    Fecha: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Clients;
