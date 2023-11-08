async function syncModels() {
    const database = require("./db");

    const Employe = require("./Models/employe.model.js")

    // Employe.hasOne(Employe, { as: 'Employe' })

    await database.sync({ force: false }); // false Crea la tabla si no existe
}

module.exports = syncModels;