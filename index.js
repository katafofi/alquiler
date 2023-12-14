const sequelize = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const syncModels = require("./syncModels");

//aca agregas mas rutas
const EmployeRouter = require("./Routes/employe.route");
const ExpenseEmployeRouter = require("./Routes/expenseEmploye.route");
const InvetarioAccesoriosRouter = require("./Routes/accesoriesInventory.route.js");
const AccesoriesRouter = require("./Routes/accesories.route");
const CategorysRouter = require("./Routes/Categorys.route");
const ClientsRouter = require("./Routes/clients.route");
const ColorsRouter = require("./Routes/colors.route");
const StatusPayRouter = require ("./Routes/satatusPay.route.js");
const SizesRouter = require("./Routes/sizes.route");
const StoreRouter = require("./Routes/store.route");
const PaymentTypeRouter = require("./Routes/paymentType.route");
const StatusRegisterNegativeRouter = require("./Routes/statusRegisterNegative.route");
const PuchaseAccesoriesOrderRouter = require ("./Routes/PuchareAccesoriesOrder.route.js");
const RentingRoute = require("./Routes/renting.route.js");
const AccesoriesInventorysRouter = require("./Routes/accesoriesInventory.route");
const EmployeStatusRouter = require("./Routes/employeStatus.route.js");
const ItemRouter = require("./Routes/item.route.js");
const ItemInventoryRouter = require("./Routes/itemInvetory.route.js");
const NegativeRecordRouter = require("./Routes/negativeRecord.route.js");
const PaymentsRouter = require("./Routes/payments.route.js");
const PuchareItemOrderRouter = require("./Routes/puchaseItemOrder.route.js");
const PucharseOrderRouter = require("./Routes/purchaseorder.route.js");
const RentalRefuntRouter = require("./Routes/rentalRefunt.route")

const app = express();
app.use(bodyParser.json({ limit: '40mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '40mb'}))
//config de que puedo aceptar
const corsOptions = {
  origin: "*",
  methods: "GET, PATCH, POST, DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/assets", express.static(path.join(__dirname, "assets")))
//aca agregas mas rutas a una ruta
app.use("/employe", EmployeRouter);
app.use("/expense_employe", ExpenseEmployeRouter);
app.use("/accesories_inventory", InvetarioAccesoriosRouter);
app.use("/accesories", AccesoriesRouter);
app.use("/categorys", CategorysRouter);
app.use("/clients", ClientsRouter);
app.use("/colors", ColorsRouter);
app.use("/statusPay", StatusPayRouter);
app.use("/sizes", SizesRouter);
app.use("/Store",StoreRouter );
app.use("/paymentType", PaymentTypeRouter);
app.use("/StatusRegisterNegative", StatusRegisterNegativeRouter);
app.use("/PuchaseAccesoriesOrder", PuchaseAccesoriesOrderRouter);
app.use("/renting", RentingRoute);
app.use("/accesoriesInventory", AccesoriesInventorysRouter);
app.use("/employeStatus",EmployeStatusRouter);
app.use("/item",ItemRouter);
app.use("/itemInventory", ItemInventoryRouter);
app.use("/negativeRecord", NegativeRecordRouter);
app.use("/payments", PaymentsRouter);
app.use("/PuchaseItemOrder", PuchareItemOrderRouter);
app.use("/PuchaseOrder", PucharseOrderRouter);
app.use("/rentalrefurnt", RentalRefuntRouter);


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

    const port = 3003; //por si esta ocupado uno vaya al otro

    app.listen(port, () => {
      console.log("Servidor a sido iniciado");
    });
  } catch (error) {
    console.error("Error al conectarse a la base de datos:", error);
  }
})();