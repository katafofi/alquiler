import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import InvoicePreview from '../Invoice/InvoicePreview'

const NewInvoice = (
  {
    idPurchaseOrder,
    updateActiveKeys,
    rentalStatus
  }
) => {
  const [invoiceModalActive, setInvoiceModalActive] = useState(false)
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
      <Button variant='primary' onClick={() => setInvoiceModalActive(!invoiceModalActive)} >
        Generar factura
      </Button>
      <Button variant='danger' onClick={() => {
        console.log(rentalStatus.payment)
        handleCancelPayment(rentalStatus.payment.IdPago)
        updateActiveKeys(prevKeys)
      }} >
        Cancelar Pago
      </Button>
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