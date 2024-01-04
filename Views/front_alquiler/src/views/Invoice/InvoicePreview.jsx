import Table from 'react-bootstrap/Table';
import './InvoicePreview.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import ReactToPrint from "react-to-print";
import { useInvoiceData } from '../../hooks/invoiceHooks.js';
import katmielLogo from '../../assets/katmiel-logo.png'
import Modal from 'react-bootstrap/Modal';

const InvoicePreview = ({ id, invoiceModalActive, setInvoiceModalActive, }) => {
  const [invoiceData, error] = useInvoiceData(id);
  const invoiceRef = useRef(null)
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  useEffect(() => {
    console.log("ID:", id)
    console.log("Invoice data:", invoiceData)
    console.log("Date: ", invoiceData)
  }, [invoiceData])

  return (
    <Modal show={invoiceModalActive} onHide={() => setInvoiceModalActive(false)} size="lg">
      {invoiceData && (
        <div>
          <ReactToPrint
            trigger={() => <Button>Generar PDF</Button>}
            content={() => invoiceRef.current}
            documentTitle='Factura'
            pageStyle={'print'}
          />
          <div ref={invoiceRef}>
            <Container fluid>
              <header>
                <div >
                  <Row>
                    <Col>
                      <Image src={katmielLogo} alt="Katmiel Logo" />
                    </Col>
                    <Col >
                      <div>
                        <p>VENTA Y ALQUILER DE VESTIDOS PARA NOVIA, COCTEL, GRADOS QUINCE AÑOS Y PRIMERA COMUNIÓN</p>
                        <p>Angie Ramos Jimenez</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <p>Transv. 78 L No. 68 - 03 Sur 2do. Piso . Bosa Piamonte . Cel: 320 805 6350 - 320 805 8884</p>
                <Row>
                  <Col>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr >
                          <td colSpan={3}>Fecha</td>
                        </tr>
                        <tr>
                          <th>Dia</th>
                          <th>Mes</th>
                          <th>Año</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{invoiceData.FechaCompra.getUTCDate()}</td>
                          <td>{monthNames[invoiceData.FechaCompra.getUTCMonth()]}</td>
                          <td>{invoiceData.FechaCompra.getUTCFullYear()}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs="3">
                    <Table bordered size='sm'>
                      <tbody>
                        <tr>
                          <td>Orden de trabajo</td>
                          <td>{invoiceData.IdOrdenCompra}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </header>
              <main>
                <Table bordered size='sm'>
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
                      <td>{invoiceData.FechaInicialAlquiler.getUTCDay()}</td>
                      <td>Mes</td>
                      <td>{monthNames[invoiceData.FechaInicialAlquiler.getUTCMonth()]}</td>
                      <td>Año</td>
                      <td>{invoiceData.FechaInicialAlquiler.getUTCFullYear()}</td>
                    </tr>
                    <tr>
                      <td>Fecha devolución:</td>
                      <td>Día</td>
                      <td>{invoiceData.FechaFinlAlquiler.getUTCDay()}</td>
                      <td>Mes</td>
                      <td>{monthNames[invoiceData.FechaFinlAlquiler.getUTCMonth()]}</td>
                      <td>Año</td>
                      <td>{invoiceData.FechaFinlAlquiler.getUTCFullYear()}</td>
                    </tr>
                  </tbody>
                </Table >
                {invoiceData.resultPurchareItemOrder &&
                  <Table striped bordered hover size='sm'>
                    <thead>
                      <tr>
                        <th>CANT</th>
                        <th>ARTICULO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.resultPurchareItemOrder.map((order, key) => (
                        <tr key={key}>
                          <td>{order.Cantidad}</td>
                          <td>{order.Descripcion}</td>
                        </tr>))}
                    </tbody>
                  </Table>
                }
                {invoiceData.resultPurchaseAccesoriesOrder &&
                  <Table striped bordered hover size='sm'>
                    <thead>
                      <tr>
                        <th>CANT</th>
                        <th>ACCESORIO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.resultPurchaseAccesoriesOrder.map((order, key) => (
                        <tr key={key}>
                          <td>{order.cantidad}</td>
                          <td>{order.Descripcion}</td>
                        </tr>))}
                    </tbody>
                  </Table>
                }
              </main>
              <footer>
                <Row>
                  <Col xs="9">
                    <p className='fs-6'>El cliente esta en la obligación de responder por las prendas ya descritas<br />
                      El retardo en la devolución de las prendas ocasionara<br />
                      <strong>MULTA DE $10.000 DIARIOS.</strong><br />
                      El cliente esta obligado a llevar las prendas estipuladas en esta factura.<br />
                      <strong>Por Ningún Motivo se Hará Devolución de Dinero Ni Transferencia de Saldos a Otra Factura.</strong><br />
                      La entrega de las prendas será en la fecha esTablecida en esta factura.<br />
                      Después de las 3 pm para la entrega de las prendas favor traer fotocopia de cédula de la persona quien venga a
                      mirarlas y un recibo público de agua o luz.</p>
                    <Table size='sm'>
                      <tbody>
                        <tr>
                          <td>Firma:</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>CC:</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs='3'>
                    <p>Fecha ultimo abono: {invoiceData.lastCredit}</p>
                    <h3>TOTAL $</h3>
                    <p>{invoiceData.Total}</p>
                    <h3>ABONO $</h3>
                    <p>{invoiceData.credit}</p>
                    <h3>SALDO $</h3>
                    <p>{invoiceData.balance}</p>
                  </Col>
                </Row>
              </footer>
            </Container>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default InvoicePreview