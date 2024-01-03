import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import InvoicePreview from '../Invoice/InvoicePreview'

const NewInvoice = ({ idPurchaseOrder }) => {
  const [invoiceModalActive, setInvoiceModalActive] = useState(false)
  console.log(idPurchaseOrder)
  return (
    <Container fluid>
      <Button variant='primary' onClick={() =>
        setInvoiceModalActive(!invoiceModalActive)
      } >Generar factura</Button>
      <InvoicePreview
        id={idPurchaseOrder}
        invoiceModalActive={invoiceModalActive}
        setInvoiceModalActive={setInvoiceModalActive}
      />
    </Container>
  )
}

export default NewInvoice