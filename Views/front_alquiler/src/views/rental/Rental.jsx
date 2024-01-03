import { Accordion, Container } from 'react-bootstrap'
import NewRent from './NewRent'
import NewArticlesOrder from './NewArticlesOrder'
import NewPurchaseOrder from './NewPurchaseOrder'
import NewAccesoriesOrder from './NewAccesoriesOrder'
import NewInvoice from './NewInvoice'
import { useEffect, useState } from 'react'

const defaultKeyStatus = [
  {
    activeKey: '0',
    active: true,
  },
  {
    activeKey: '1',
    active: false,
  },
  {
    activeKey: '2',
    active: false,
  },
  {
    activeKey: '3',
    active: false,
  },
  {
    activeKey: '4',
    active: false,
  },
]

const Rental = () => {
  const [activeKeys, setActiveKeys] = useState(['0'])
  const [keyStatus, setKeyStatus] = useState(defaultKeyStatus)
  const [rentalStatus, setRentalStatus] = useState(null)

  const getActiveKeys = () => keyStatus
    .filter(el => el.active)
    .map(el => el.activeKey)

  const updateActiveKeys = (newActiveKeys) => setKeyStatus(keyStatus.map(el => {
    if (newActiveKeys.includes(el.activeKey)) {
      return { ...el, active: true }
    }
    return { ...el, active: false }
  }))

  const updateRentalStatus = (newData) => setRentalStatus(
    {
      ...rentalStatus,
      ...newData
    })

  useEffect(() => {
    console.log(rentalStatus)
  }, [rentalStatus])

  useEffect(() => {
    setActiveKeys(getActiveKeys())
  }, [keyStatus])


  return (
    <Container fluid>
      {/* <button onClick={handleButton}>Abrir</button> */}
      <Accordion activeKey={activeKeys}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Alquiler</Accordion.Header>
          <Accordion.Body>
            <NewRent
              updateActiveKeys={updateActiveKeys}
              updateRentalStatus={updateRentalStatus}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Orden de compra</Accordion.Header>
          {
            rentalStatus
              ?
              <Accordion.Body>
                <NewPurchaseOrder
                  rentalStatus={rentalStatus}
                  setRentalStatus={setRentalStatus}
                  updateActiveKeys={updateActiveKeys}
                  updateRentalStatus={updateRentalStatus}
                />
              </Accordion.Body>
              :
              <Accordion.Body>
                <p>Cargando...</p>
              </Accordion.Body>
          }
        </ Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Articulos</Accordion.Header>
          <Accordion.Body>
            <NewArticlesOrder updateActiveKeys={updateActiveKeys} />
          </Accordion.Body>
        </ Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Accesorios</Accordion.Header>
          <Accordion.Body>
            <NewAccesoriesOrder updateActiveKeys={updateActiveKeys} />
          </Accordion.Body>
        </ Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Generar orden de compra</Accordion.Header>
          <Accordion.Body>
            <NewInvoice updateActiveKeys={updateActiveKeys} />
          </Accordion.Body>
        </ Accordion.Item>
      </Accordion>
    </Container>
  )
}

export default Rental