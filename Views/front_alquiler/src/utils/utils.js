export const getArticlesAccesoriesByIdPurchaseOrder = (
  idPurchaseOrder,
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

  return {
    filteredArticles,
    filteredAccesories,
  }
}