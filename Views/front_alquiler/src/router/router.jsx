import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import ReportsNegative from '../views/ReportsNegative';
import ImagenCataComponente from '../components/provider/Imagen/Imagen';
import Employe from '../views/Employe';
import ExpenseEmploye from '../views/ExpenseEmploye';
import StatusEmploye from '../views/StatusEmploye';
import Categorys from '../views/Categorys';
import Clients from '../views/Clients';
import StatusPay from '../views/StatusPay';
import StatusRegisterNegative from '../views/StatusRegisterNegative';
import Sizes from '../views/Sizes';
import PaymentType from '../views/PaymentType';
import Accesories from '../views/Accesories';
import Store from '../views/Store';
import PuchaseAccesoriesOrder from '../views/PuchaseAccesoriesOrder';
import PuchaseOrder from '../views/puchaseOrder';
import AccesoriesInventory from '../views/accesoriesInventory';
import InvoicePreview from '../views/Invoice/InvoicePreview';
import Colors from '../views/Colors';
import ItemInventory from '../views/ItemInventory';
import Item from '../views/Item';
import NegativeRecord from '../views/NegativeRecord';
import Payments from '../views/Payments';
import Reports from '../views/reports/Reports';
import RentingRefunt from '../views/RentingRefunt';
import PuchareItemOrder from '../views/PuchareItemOrder';
import Renting from '../views/renting';
import Rental from "../views/rental/Rental";
import Credit from "../views/credit/Credit";
import RentalRefund from "../views/rentalRefund/RentalRefund";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/reportsnegative",
        element: <ReportsNegative />,
      },
      {
        path: "/images/:imageName",
        element: <ImagenCataComponente />,
      },
      {
        path: "/employe",
        element: <Employe />,
      },
      {
        path: "/expense/employe",
        element: <ExpenseEmploye />,
      },
      {
        path: "/status/employe",
        element: <StatusEmploye />,
      },
      {
        path: "/categorys",
        element: <Categorys />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/status/pay",
        element: <StatusPay />,
      },
      {
        path: "/status/register/negative",
        element: <StatusRegisterNegative />,
      },
      {
        path: "/sizes",
        element: <Sizes />,
      },
      {
        path: "/payment/type",
        element: <PaymentType />,
      },
      {
        path: "/accesories",
        element: <Accesories />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/puchase/accesories/order",
        element: <PuchaseAccesoriesOrder />,
      },
      {
        path: "/puchase/order",
        element: <PuchaseOrder />,
      },
      {
        path: "/accesories/inventory",
        element: <AccesoriesInventory />,
      },
      {
        path: "/colors",
        element: <Colors />,
      },
      {
        path: "/item/inventory",
        element: <ItemInventory />,
      },
      {
        path: "/item",
        element: <Item />,
      },
      {
        path: "/invoicePreview",
        element: <InvoicePreview />,
      },
      {
        path: "/negative/record",
        element: <NegativeRecord />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/rentalrefurnt",
        element: <RentingRefunt />,
      },
      {
        path: "/puchase/item/order",
        element: <PuchareItemOrder />,
      },
      {
        path: "/rental",
        element: <Rental />,
      },
      {
        path: "/credit",
        element: <Credit />,
      },
      {
        path: "/rentalRefund",
        element: <RentalRefund />,
      },
      {
        path: "/renting",
        element: <Renting />,
      },
    ],
  },

]);

export default router