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

  const filteredArticles = articlesOrders
    .filter(articleOrder => articleOrder.IdOrdenCompra === idPurchaseOrder)
    .map(articleOrder => (
      {
        amount: articleOrder.Cantidad,
        description: articles
          .find(article => article.IdArticulo === articleOrder.IdArticulo).Descripcion
      }
    ))

  const filteredAccesories = accesoriesOrders
    .filter(accesoryOrder => accesoryOrder.IdOrdenCompra === idPurchaseOrder)
    .map(accesoryOrder => (
      {
        amount: accesoryOrder.cantidad,
        description: accesories
          .find(accesory => accesory.IdAccesorio === accesoryOrder.IdAccesorio).Descripcion
      }
    ))

  const selectedRentId = rents
    .find(rent => rent.IdAlquiler === purchaseOrders
      .find(order => order.IdOrdenCompra === idPurchaseOrder).IdAlquiler
    ).IdAlquiler

  const selectedClientId = clients
    .find(client => client.IdCliente === rents
      .find(rent => rent.IdAlquiler === purchaseOrders
        .find(order =>
          order.IdOrdenCompra === idPurchaseOrder)
        .IdAlquiler)
      .IdCliente)
    .IdCliente

  return {
    filteredArticles,
    filteredAccesories,
    selectedClientId,
    selectedRentId
  }
}