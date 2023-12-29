import Table from 'react-bootstrap/Table';
import './InvoicePreview.css'
import { Button } from 'react-bootstrap';
import { useRef } from 'react';
import ReactToPrint from "react-to-print";
import { useInvoiceData } from '../../hooks/invoiceHooks.js';
import Modal from 'react-bootstrap/Modal';

const InvoicePreview = ({ id, invoiceModalActive, setInvoiceModalActive, }) => {
  const [invoiceData, error] = useInvoiceData(id);
  const invoiceRef = useRef(null)

  return (
    <Modal show={invoiceModalActive} onHide={() => setInvoiceModalActive(false)}>
      {invoiceData && (
        <div>
          <ReactToPrint
            trigger={() => <Button>Generar PDF</Button>}
            content={() => invoiceRef.current}
            documentTitle='Factura'
            pageStyle={'print'}
          />
          <div ref={invoiceRef}>
            <header>
              <div >
                <img src="" alt="" />
                <div >
                  <div>
                    <p>VENTA Y ALQUILER DE VESTIDOS PARA NOVIA, COCTEL, GRADOS QUINCE AÑOS Y PRIMERA COMUNIÓN</p>
                    <p>Angie Ramos Jimenez</p>
                  </div>
                </div>
              </div>
              <p>Transv. 78 L No. 68 - 03 Sur 2do. Piso . Bosa Piamonte . Cel: 320 805 6350 - 320 805 8884</p>

              <div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Dia</th>
                      <th>Mes</th>
                      <th>Año</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{invoiceData.FechaCompra.getDay()}</td>
                      <td>{invoiceData.FechaCompra.getMonth()}</td>
                      <td>{invoiceData.FechaCompra.getYear()}</td>
                    </tr>
                  </tbody>
                </Table>
                <table>
                  <tbody>
                    <tr>
                      <td>Orden de trabajo</td>
                      <td>{invoiceData.IdOrdenCompra}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </header>
            <main>
              <table>
                <tbody>
                  <tr>
                    <td>Nombre:</td>
                    <td colSpan="4">{invoiceData.Cliente.Nombre} {invoiceData.Cliente.Apellido}</td>
                    <td>Cel:</td>
                    <td>{invoiceData.Cliente.Telefono}</td>
                  </tr>
                  <tr>
                    <td>Direccion:</td>
                    <td colSpan="6">{invoiceData.Cliente.Direccion}</td>
                  </tr>
                  <tr>
                    <td>Barrio:</td>
                    <td colSpan="6"></td>
                  </tr>
                  <tr>
                    <td>Ref:</td>
                    <td colSpan="4">{invoiceData.Cliente.ReferenciaPersonalNombre}</td>
                    <td>Tel:</td>
                    <td>{invoiceData.Cliente.ReferenciaPersonalTelefono}</td>
                  </tr>
                  <tr>
                    <td>Fecha Retirado:</td>
                    <td>Día</td>
                    <td>{invoiceData.FechaInicialAlquiler.getDay()}</td>
                    <td>Mes</td>
                    <td>{invoiceData.FechaInicialAlquiler.getMonth()}</td>
                    <td>Año</td>
                    <td>{invoiceData.FechaInicialAlquiler.getYear()}</td>
                  </tr>
                  <tr>
                    <td>Fecha devolución:</td>
                    <td>Día</td>
                    <td>{invoiceData.FechaFinlAlquiler.getDay()}</td>
                    <td>Mes</td>
                    <td>{invoiceData.FechaFinlAlquiler.getMonth()}</td>
                    <td>Año</td>
                    <td>{invoiceData.FechaFinlAlquiler.getYear()}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>CANT</th>
                    <th>ARTICULO</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.resultPurchareItemOrder.map((order, key) => (
                    <tr key={key}>
                      <td>${order[key]}</td>
                      <td>${order.Descripcion}</td>
                    </tr>))}
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>CANT</th>
                    <th>ACCESORIO</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.resultPurchaseAccesoriesOrder.map((order, key) => (
                    <tr key={key}>
                      <td>${order[key]}</td>
                      <td>${order.Descripcion}</td>
                    </tr>))}
                </tbody>
              </table>
            </main>
            <footer>
              <div>
                <p>El cliente esta en la obligación de responder por las prendas ya descritas</p>
                <p>El retardo en la devolución de las prendas ocasionara</p>
                <p><strong>MULTA DE $10.000 DIARIOS.</strong></p>
                <p>El cliente esta obligado a llevar las prendas estipuladas en esta factura.</p>
                <p><strong>Por Ningún Motivo se Hará Devolución de Dinero Ni Transferencia de Saldos a Otra Factura.</strong></p>
                <p>La entrega de las prendas será en la fecha establecida en esta factura.</p>
                <p>Después de las 3 pm para la entrega de las prendas favor traer fotocopia de cédula de la persona quien venga a
                  mirarlas y un recibo público de agua o luz.</p>
                <table>
                  <tbody>
                    <tr>
                      <td>Firma</td>
                      <td>Catalina</td>
                    </tr>
                    <tr>
                      <td>C.C.</td>
                      <td>12319021</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p>Fecha ultimo abono: {invoiceData.lastCredit}</p>
                <h3>TOTAL $</h3>
                <p>{invoiceData.Total}</p>
                <h3>ABONO $</h3>
                <p>{invoiceData.credit}</p>
                <h3>SALDO $</h3>
                <p>{invoiceData.balance}</p>
              </div>
            </footer>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default InvoicePreview