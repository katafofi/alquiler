import { useEffect, useState } from "react";

const URL = "http://localhost:";
const PORT = "3003";
const FORMCLIENTS = "Clients"
const FORMPURCHASEORDER = "PuchaseOrder"
const FORMRENTS = "renting"


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
      purchaseOrder: purchaseOrder ? purchaseOrder.IdOrdenCompra : null,
    }
  })
  return newTableData
}

export const useRentalRefundData = () => {
  const [clients, setClients] = useState(null)
  const [purchaseOrders, setPurchaseOrders] = useState(null)
  const [rents, setRents] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await fetch(`${URL}${PORT}/${FORMCLIENTS}`);
        const purchaseOrderResponse = await fetch(`${URL}${PORT}/${FORMPURCHASEORDER}`);
        const rentsResponse = await fetch(`${URL}${PORT}/${FORMRENTS}`);
        const clientsData = await clientsResponse.json()
        const purchaseOrderData = await purchaseOrderResponse.json()
        const rentsData = await rentsResponse.json()
        setClients(clientsData);
        setPurchaseOrders(purchaseOrderData);
        setRents(rentsData)
        setTableData(getTableData(clientsData, purchaseOrderData, rentsData))
      } catch (error) {
        setError(error.message);
        console.error("Error:", error.message);
      }
    };

    fetchData();

  }, []);

  return [clients, purchaseOrders, rents, tableData, error];
};