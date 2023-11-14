const sequelize = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const syncModels = require("./syncModels");

//aca agregas mas rutas
const EmployeRouter = require("./Routes/employe.route");
const ExpenseEmployeRouter = require("./Routes/expenseEmploye.route");
const InvetarioAccesoriosRouter = require("./Routes/accesories_inventory.route");
const AccesoriesRouter = require("./Routes/accesories.route");
const CategorysRouter = require("./Routes/Categorys.route");
const ClientsRouter = require("./Routes/clients.route")


const app = express();

app.use(bodyParser.json());

//config de que puedo aceptar
const corsOptions = {
  origin: "*",
  methods: "GET, PATCH, POST, DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//aca agregas mas rutas a una ruta
app.use("/employe", EmployeRouter);
app.use("/expense_employe", ExpenseEmployeRouter);
app.use("/accesories_inventory", InvetarioAccesoriosRouter);
app.use("/accesories", AccesoriesRouter);
app.use("/categorys", CategorysRouter);
app.use("/clients", ClientsRouter)


async function MigrateModels() {
  await syncModels();
}

async function ConnectDB() {
  await sequelize
    .authenticate()
    .then(function () {
      console.log("sucess");
    })
    .catch(function (error) {
      console.log("error: " + error);
    });
}

(async () => {
  try {
    await ConnectDB();
    await MigrateModels();

    const port = 3001; //por si esta ocupado uno vaya al otro

    app.listen(port, () => {
      console.log("Servidor a sido iniciado");
    });
  } catch (error) {
    console.error("Error al conectarse a la base de datos:", error);
  }
})();
