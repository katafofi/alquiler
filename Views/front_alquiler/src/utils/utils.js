export const getNegativeRecordInfo = (
  idPurchaseOrder,
  rents,
  purchaseOrders,
  clients,
  articlesOrders,
  accesoriesOrders,
  articles,
  accesories,
) => {
  // Convertir arrays a Map para búsquedas rápidas
  const articlesMap = new Map(articles.map(article => [article.IdArticulo, article]));
  const accesoriesMap = new Map(accesories.map(accesory => [accesory.IdAccesorio, accesory]));
  const rentsMap = new Map(rents.map(rent => [rent.IdAlquiler, rent]));
  const purchaseOrdersMap = new Map(purchaseOrders.map(order => [order.IdOrdenCompra, order]));
  const clientsMap = new Map(clients.map(client => [client.IdCliente, client]));

  // Obtener la orden de compra seleccionada
  const selectedPurchaseOrder = purchaseOrdersMap.get(idPurchaseOrder);

  // Validar si la orden de compra existe
  if (!selectedPurchaseOrder) {
    throw new Error(`No se encontró la orden de compra con ID: ${idPurchaseOrder}`);
  }

  // Obtener el alquiler asociado
  const selectedRent = rentsMap.get(selectedPurchaseOrder.IdAlquiler);

  // Validar si el alquiler existe
  if (!selectedRent) {
    throw new Error(`No se encontró el alquiler con ID: ${selectedPurchaseOrder.IdAlquiler}`);
  }

  // Obtener el cliente asociado
  const selectedClient = clientsMap.get(selectedRent.IdCliente);

  // Validar si el cliente existe
  if (!selectedClient) {
    throw new Error(`No se encontró el cliente con ID: ${selectedRent.IdCliente}`);
  }

  // Filtrar y mapear artículos
  const filteredArticles = articlesOrders
    .filter(articleOrder => articleOrder.IdOrdenCompra === idPurchaseOrder)
    .map(articleOrder => ({
      amount: articleOrder.Cantidad,
      description: articlesMap.get(articleOrder.IdArticulo)?.Descripcion || "Desconocido",
    }));

  // Filtrar y mapear accesorios
  const filteredAccesories = accesoriesOrders
    .filter(accesoryOrder => accesoryOrder.IdOrdenCompra === idPurchaseOrder)
    .map(accesoryOrder => ({
      amount: accesoryOrder.cantidad,
      description: accesoriesMap.get(accesoryOrder.IdAccesorio)?.Descripcion || "Desconocido",
    }));

  return {
    filteredArticles,
    filteredAccesories,
    selectedClientId: selectedClient.IdCliente,
    selectedRentId: selectedRent.IdAlquiler,
  };
};