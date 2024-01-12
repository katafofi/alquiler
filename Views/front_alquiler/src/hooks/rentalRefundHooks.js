import { useEffect, useState } from "react";

const URL = "http://localhost:";
const PORT = "3003";
const FORMCLIENTS = "Clients"
const FORMPURCHASEORDER = "PuchaseOrder"
const FORMRENTS = "renting"
const FORMARTICLESORDER = "PuchaseItemOrder"
const FORMACCESORIESORDER = "PuchaseAccesoriesOrder"
const FORMARTICLES = "item"
const FORMACCESORIES = "accesories"
const FORMNEGATIVERECORD = "StatusRegisterNegative"

const getTableData = (clientsData, purchaseOrderData, rentsData) => {
  const newTableData = rentsData.map(rent => {
    const client = clientsData.find(client => client.IdCliente === rent.IdCliente)
    const purchaseOrder = purchaseOrderData.find(purchaseOrder => purchaseOrder.IdAlquiler === rent.IdAlquiler)
    return {
      initialDate: rent.FechaInicialAlquiler,
      finalDate: rent.FechaFinlAlquiler,
      cedula: client.Cedula,
      name: client.Nombre,
      lastName: client.Apellido,
      idPurchaseOrder: purchaseOrder ? purchaseOrder.IdOrdenCompra : null,
    }
  })
  return newTableData
}

export const useRentalRefundData = () => {
  const [clients, setClients] = useState(null)
  const [purchaseOrders, setPurchaseOrders] = useState(null)
  const [rents, setRents] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [articlesOrders, setArticlesOrders] = useState(null)
  const [accesoriesOrders, setAccesoriesOrders] = useState(null)
  const [articles, setArticles] = useState(null)
  const [accesories, setAccesories] = useState(null)
  const [negativeRecord, setNegativeRecord] = useState(null)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await fetch(`${URL}${PORT}/${FORMCLIENTS}`);
        const purchaseOrderResponse = await fetch(`${URL}${PORT}/${FORMPURCHASEORDER}`);
        const rentsResponse = await fetch(`${URL}${PORT}/${FORMRENTS}`);
        const articlesOrdersResponse = await fetch(`${URL}${PORT}/${FORMARTICLESORDER}`);
        const accesoriesOrdersReponse = await fetch(`${URL}${PORT}/${FORMACCESORIESORDER}`);
        const articlesResponse = await fetch(`${URL}${PORT}/${FORMARTICLES}`);
        const accesoriesReponse = await fetch(`${URL}${PORT}/${FORMACCESORIES}`);
        const negativeRecordReponse = await fetch(`${URL}${PORT}/${FORMNEGATIVERECORD}`);
        const articlesOrdersData = await articlesOrdersResponse.json()
        const accesoriesOrdersData = await accesoriesOrdersReponse.json()
        const articlesData = await articlesResponse.json()
        const accesorieData = await accesoriesReponse.json()
        const clientsData = await clientsResponse.json()
        const purchaseOrderData = await purchaseOrderResponse.json()
        const rentsData = await rentsResponse.json()
        const negativeRecordData = await negativeRecordReponse.json()
        console.log("HOLA: \n\n\n\n\n", negativeRecordData)
        setClients(clientsData);
        setPurchaseOrders(purchaseOrderData);
        setRents(rentsData)
        setArticlesOrders(articlesOrdersData)
        setAccesoriesOrders(accesoriesOrdersData)
        setArticles(articlesData)
        setAccesories(accesorieData)
        setNegativeRecord(negativeRecordData)
        setTableData(getTableData(clientsData, purchaseOrderData, rentsData))
      } catch (error) {
        setError(error.message);
        console.error("Error:", error.message);
      }
    };

    fetchData();

  }, []);

  return [
    clients,
    purchaseOrders,
    rents,
    articlesOrders,
    accesoriesOrders,
    articles,
    accesories,
    negativeRecord,
    tableData,
    error,
  ];
};