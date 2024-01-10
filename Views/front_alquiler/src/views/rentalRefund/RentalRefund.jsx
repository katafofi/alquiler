import { useEffect, useState } from "react"
import { Accordion, Container, Form, Table } from "react-bootstrap"
import FindPurchaseOrder from "./FindPurchaseOrder"


const defaultKeyStatus = [
  {
    activeKey: '0',
    active: true,
  },
]


const getActiveKeys = (keyStatus) => keyStatus
  .filter(el => el.active)
  .map(el => el.activeKey)

const updateRentalStatus = (newData) => setRentalStatus(
  {
    ...rentalStatus,
    ...newData
  })

const RentalRefund = () => {
  const [keyStatus, setKeyStatus] = useState(defaultKeyStatus)
  const [activeKeys, setActiveKeys] = useState([])

  useEffect(() => {
    setActiveKeys(getActiveKeys(keyStatus))
  }, [keyStatus])



  return (
    <Container fluid className='mb-5'>
      <Accordion activeKey={activeKeys}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Alquiler</Accordion.Header>
          <Accordion.Body>
            <FindPurchaseOrder />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  )
}

export default RentalRefund