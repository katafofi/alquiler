const Sequelize = require('sequelize');
const database = require('../db.js');

const Employe = database.define('Empleados', {
    IdEmpleado: {
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
    Correo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
    },
    Direccion: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    Cedula: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
    },
    Telefono: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
    },
    IdEstadoEmpleado: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
},
 {
    timestamps: false
})

module.exports = Employe;