const Sequelize = require("sequelize");
const database = require("../db.js");

const RentingRefunt = database.define("RegistrosDevolucion", {
  IdRegistroDevolucio: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Descripcion: {
    type: Sequelize.STRING(20),
    allowNull: false
},
FechaFinAlquiler: {
        type: Sequelize.DATE,
        allowNull: false  
},
IdAlquiler: {
    type: Sequelize.INTEGER,
    allowNull: false 
}

})

module.exports = RentingRefunt;