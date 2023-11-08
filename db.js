const { Sequelize } = require('sequelize'); //ORM
require("dotenv").config();


//xampp
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: "127.0.0.1",
    dialect : 'mysql'
})

module.exports = sequelize;