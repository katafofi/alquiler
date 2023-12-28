const addOrders = (orders) => {
  let ordersList = '';
  let key = 'cantidad';
  if ('Cantidad' in orders[0]) key = 'Cantidad'
  orders.forEach(order => {
    ordersList += `
      <tr>
        <td>${order[key]}</td>
        <td>${order.Descripcion}</td>
      </tr>
    `
  })
  return ordersList
}

const calcCredit = (payments, Total) => {
  let credit = 0;
  payments.forEach(payment => {
    credit += parseFloat(payment.Valor)
  })
  const balance = parseFloat(Total) - parseFloat(credit);
  const lastCredit = (new Date(payments.slice(-1)[0].FechadPago)).toLocaleDateString();
  return { credit, balance, lastCredit };
}

const createHtmlInvoice = ({
  FechaCompra,
  IdOrdenCompra,
  Cliente,
  FechaInicialAlquiler,
  FechaFinlAlquiler,
  resultPurchareItemOrder,
  resultPurchaseAccesoriesOrder,
  Total,
  payments
}) => {
  const { credit, balance, lastCredit } = calcCredit(payments, Total);
  FechaCompra = new Date(FechaCompra);
  FechaInicialAlquiler = new Date(FechaInicialAlquiler);
  FechaFinlAlquiler = new Date(FechaFinlAlquiler);
  const htmlInvoice = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        background-color: #f5f5f5;
      }
      
      header {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: center;
          
      }
      
      header div{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 20px;
          align-items: center;
          justify-content: space-between;
          width: 80%;
          margin-top: 20px;
      }
      
      header div div {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          
      }
      
      header div div p {
          margin: 0;
          padding: 0;
          font-size: 12px;
      }
      
      header img{
          width: 200px;
      }
      
      header table {
          display: flex;
          flex-flow: row nowrap;
      }
      
      table {
          margin: 0 auto;
          border-collapse: collapse;
          border: 1px solid #000;
      }
      
      tr, td, th{
          border: 1px solid #000;
      }
      
      main {
          margin-top: 10px;
          flexflow: row nowrap;
          gap: 10px;
      }
      
      main table {
          margin-bottom: 10px;
      }
      
      footer {
          display: flex;
          flexflow: row nowrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
      }
    </style>
  </head>
  
  <body>
    <header>
      <div>
        <img src="logoprovisional.png" alt="">
        <div class="text-2xl">
          <div>
            <p>VENTA Y ALQUILER DE VESTIDOS PARA NOVIA, COCTEL, GRADOS QUINCE AÑOS Y PRIMERA COMUNIÓN</p>
            <p class="name-cursive">Angie Ramos Jimenez</p>
          </div>
        </div>
      </div>
      <small>Transv. 78 L No. 68 - 03 Sur 2do. Piso . Bosa Piamonte . Cel: 320 805 6350 - 320 805 8884</small>
      <div>
        <table>
          <tr>
            <th rowspan="2">Fecha</th>
            <th>Dia</th>
            <th>Mes</th>
            <th>Año</th>
          </tr>
          <tr>
            <td>${FechaCompra.getDay()}</td>
            <td>${FechaCompra.getMonth()}</td>
            <td>${FechaCompra.getYear()}</td>
          </tr>
        </table>
        <table>
          <tr>
            <td>Orden de trabajo</td>
            <td>${IdOrdenCompra}</td>
          </tr>
        </table>
      </div>
    </header>
    <main>
      <table>
        <tr>
          <td>Nombre:</td>
          <td colspan="4">${Cliente.Nombre} ${Cliente.Apellido}</td>
          <td>Cel:</td>
          <td>${Cliente.Telefono}</td>
        </tr>
        <tr>
        </tr>
        <tr>
          <td>Direccion:</td>
          <td colspan="6">${Cliente.Direccion}</td>
        </tr>
        <tr>
          <td>Barrio:</td>
          <td colspan="6"></td>
        </tr>
        <tr>
          <td>Ref:</td>
          <td colspan="4">${Cliente.ReferenciaPersonalNombre}</td>
          <td>Tel:</td>
          <td>${Cliente.ReferenciaPersonalTelefono}</td>
        </tr>
        <tr>
          <td>Fecha Retirado:</td>
          <td>Día</td>
          <td>${FechaInicialAlquiler.getDay()}</td>
          <td>Mes</td>
          <td>${FechaInicialAlquiler.getMonth()}</td>
          <td>Año</td>
          <td>${FechaInicialAlquiler.getYear()}</td>
        </tr>
        <tr>
          <td>Fecha devolución:</td>
          <td>Día</td>
          <td>${FechaFinlAlquiler.getDay()}</td>
          <td>Mes</td>
          <td>${FechaFinlAlquiler.getMonth()}</td>
          <td>Año</td>
          <td>${FechaFinlAlquiler.getYear()}</td>
        </tr>
      </table>
  
      <table>
        <tr>
          <th>CANT</th>
          <th>ARTICULOS</th>
        </tr>
        ${addOrders(resultPurchareItemOrder)}
      </table>
      <table>
        <tr>
          <th>CANT</th>
          <th>ACCESORIOS</th>
        </tr>
        ${addOrders(resultPurchaseAccesoriesOrder)}
      </table>
    </main>
    <footer>
      <div>
        <P>El cliente esta en la obligación de responder por las prendas ya descritas</P>
        <p>El retardo en la devolución de las prendas ocasionara</p>
        <p><strong>MULTA DE $10.000 DIARIOS.</strong></p>
        <p>El cliente esta obligado a llevar las prendas estipuladas en esta factura.</p>
        <p><strong>Por Ningún Motivo se Hará Devolución de Dinero Ni Transferencia de Saldos a Otra Factura.</strong></p>
        <p>La entrega de las prendas será en la fecha establecida en esta factura.</p>
        <p>Después de las 3 pm para la entrega de las prendas favor traer fotocopia de cédula de la persona quien venga a
          mirarlas y un recibo público de agua o luz.</p>
        <table>
          <tr>
            <td>Firma</td>
            <td></td>
          </tr>
          <tr>
            <td>C.C.</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div>
        <p>Fecha ultimo abono: ${lastCredit}
        <h3>TOTAL $</h3>
        <p>${Total}</p>
        <h3>ABONO $</h3>
        <p>${credit}</p>
        <h3>SALDO $</h3>
        <p>${balance}</p>
      </div>
    </footer>
  
  </body>
  
  </html>
  `
  return htmlInvoice
}


module.exports = { createHtmlInvoice };