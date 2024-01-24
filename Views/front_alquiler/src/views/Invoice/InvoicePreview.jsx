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

  const getTotalPrice = () => invoiceData.resultPurchareItemOrder.reduce((counter, current) => counter + parseInt(current.Precio), 0).toLocaleString()

  useEffect(() => {
    console.log("ID:", id)
    console.log("Invoice data:", invoiceData)
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
                    <Col xs={2}>
                      <div className='img-cont'>
                        <Image src={katmielLogo} className='img-fluid' alt="Katmiel Logo" />
                      </div>
                    </Col>
                    <Col xs={10}>
                      <div className='flex-center'>
                        <p>VENTA Y ALQUILER DE VESTIDOS PARA NOVIA, COCTEL, GRADOS QUINCE AÑOS Y PRIMERA COMUNIÓN</p>
                        <p className='f-family-DancingScript'>Angie Ramos Jimenez</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className='flex-center'>
                  <p>Transv. 78 L No. 68 - 03 Sur 2do. Piso . Bosa Piamonte . Cel: 320 805 6350 - 320 805 8886</p>
                </div>
                <Row>
                  <Col xs={3}>
                    <Table striped bordered hover size="sm">
                      <thead>
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
                    <Table striped bordered hover size='sm'>
                      <thead>
                        <tr>
                          <th>Vendedor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {invoiceData.NombreEmpleado}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs="1">
                    <Table striped bordered hover size='sm'>
                      <thead>
                        <tr>
                          <th>ID Alquiler</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {invoiceData.IdAlquiler}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs="3">
                    <Table striped bordered hover size='sm'>
                      <thead>
                        <tr>
                          <th>Orden de trabajo</th>
                          <th>cliente</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{invoiceData.IdOrdenCompra}</td>
                          <td>{invoiceData.Cliente.IdCliente}</td>
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
                      <td colSpan="6">{invoiceData.Cliente.Barrio}</td>
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
                      <td>{invoiceData.FechaInicialAlquiler.getUTCDate()}</td>
                      <td>Mes</td>
                      <td>{monthNames[invoiceData.FechaInicialAlquiler.getUTCMonth()]}</td>
                      <td>Año</td>
                      <td>{invoiceData.FechaInicialAlquiler.getUTCFullYear()}</td>
                    </tr>
                    <tr>
                      <td>Fecha devolución:</td>
                      <td>Día</td>
                      <td>{invoiceData.FechaFinlAlquiler.getUTCDate()}</td>
                      <td>Mes</td>
                      <td>{monthNames[invoiceData.FechaFinlAlquiler.getUTCMonth()]}</td>
                      <td>Año</td>
                      <td>{invoiceData.FechaFinlAlquiler.getUTCFullYear()}</td>
                    </tr>
                  </tbody>
                </Table >
                <Row>
                  {invoiceData.resultPurchareItemOrder.length > 0 &&
                    <Col>
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
                    </Col>
                  }
                  {invoiceData.resultPurchaseAccesoriesOrder.length > 0 &&
                    <Col>
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
                    </Col>
                  }
                </Row>
              </main>
              <footer>
                <Row>
                  <Col xs="9">
                    <small className='fs-7 text-xxs' style={{ fontSize: '0.5rem' }}>El cliente esta en la obligación de
                     responder por las prendas ya descritas. El retardo en la devolución 
                     de las prendas ocasionara. <strong>MULTA DE $10.000 DIARIOS.</strong>El cliente esta obligado a llevar las prendas estipuladas en esta factura. <strong>Por Nin
                        gún Motivo se Hará Devolución de Dinero Ni Transferencia de Saldos a Otra Factura. </strong>La entrega de las prendas será en la fecha esTablecida en esta factura. Después de las 3 pm para la entrega de las prendas favor traer fotocopia de cédula de la persona quien venga a mirarlas y un recibo público de agua o luz.</small>
                    <div className='mt-3'>
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
                    </div>
                  </Col>
                  <Col xs='3'>
                    <p>
                      <small>
                        <strong>Fecha ultimo abono:</strong> {invoiceData.lastCredit}
                      </small>
                    </p>
                    <p>
                      <small><strong>TOTAL: </strong>{getTotalPrice()}$</small>
                    </p>
                    <p>
                      <small><strong>ABONO: </strong>{invoiceData.credit.toLocaleString()}$</small>
                    </p>
                    <p>
                      <small><strong>SALDO: </strong>{invoiceData.balance.toLocaleString()}$</small>
                    </p>
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