import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import InvoicePreview from '../Invoice/InvoicePreview'
import { useNavigate } from 'react-router'



const NewInvoice = (
  {
    idPurchaseOrder,
    updateActiveKeys,
    rentalStatus,
  }
) => {
  const [invoiceModalActive, setInvoiceModalActive] = useState(false)
  const navigate = useNavigate()

  const prevKeys = ['2', '3', '4']

  const FORM = "payments";
  const URL = "http://localhost:";
  const PORT = "3003";

  const handleCancelPayment = async (id) => {
    try {
      const response = await fetch(`${URL}${PORT}/${FORM}/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Container fluid>
      <Row>
        <Col>
          <Button variant='primary' onClick={() => setInvoiceModalActive(!invoiceModalActive)} >
            Generar factura
          </Button>
        </Col>
        <Col>
          <Button variant='primary' onClick={() => navigate(0)} >
            Nuevo Alquiler
          </Button>
        </Col>
        <Col>
          <Button variant='danger' onClick={() => {
            handleCancelPayment(rentalStatus.payment.IdPago)
            updateActiveKeys(prevKeys)
          }} >
            Cancelar Pago
          </Button>
        </Col>

      </Row>
      {invoiceModalActive &&
        <InvoicePreview
          id={idPurchaseOrder}
          invoiceModalActive={invoiceModalActive}
          setInvoiceModalActive={setInvoiceModalActive}
        />
      }
    </Container>
  )
}

export default NewInvoice