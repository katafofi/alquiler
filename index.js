const sequelize = require('./db');
const syncModels = require('./syncModels');

async function MigrateModels() {
    await syncModels();
}

async function ConnectDB(){
    await sequelize.authenticate().then(function(){
        console.log("sucess");
    }).catch(function(error){
        console.log("error: "+error);
    });
}

(async () => {
    await ConnectDB()
    await MigrateModels()
})()