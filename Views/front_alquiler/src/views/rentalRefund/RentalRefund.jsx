import { useEffect, useState } from "react"
import { Accordion, Container, Form, Table } from "react-bootstrap"
import FindPurchaseOrder from "./FindPurchaseOrder"
import VerifyRentItems from "./VerifyRentItems"
import { useRentalRefundData } from "../../hooks/rentalRefundHooks"

const defaultKeyStatus = [
  {
    activeKey: '0',
    active: true,
  },
  {
    activeKey: '1',
    active: false,
  },
]

const getActiveKeys = (keyStatus) => keyStatus
  .filter(el => el.active)
  .map(el => el.activeKey)


const RentalRefund = () => {
  const [activeKeys, setActiveKeys] = useState([])
  const [keyStatus, setKeyStatus] = useState(defaultKeyStatus)
  const [selectedIdPurchaseOrder, setSelectedIdPurchaseOrder] = useState(null)
  const [
    clients,
    purchaseOrders,
    rents,
    articlesOrders,
    accesoriesOrders,
    articles,
    accesories,
    statusNegativeRecords,
    negativeRecords,
    tableData,
    error,
    updateTableData
  ] = useRentalRefundData()

  const updateActiveKeys = (newActiveKeys) => setKeyStatus(keyStatus.map(el => {
    if (newActiveKeys.includes(el.activeKey)) {
      return { ...el, active: true }
    }
    return { ...el, active: false }
  }))

  useEffect(() => {
    setActiveKeys(getActiveKeys(keyStatus))
  }, [keyStatus])

  return (
    <Container fluid className='mb-5'>
      <Accordion activeKey={activeKeys}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Alquiler</Accordion.Header>
          <Accordion.Body>
            <FindPurchaseOrder
              tableData={tableData}
              updateActiveKeys={updateActiveKeys}
              setSelectedIdPurchaseOrder={setSelectedIdPurchaseOrder}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Verificación</Accordion.Header>
          <Accordion.Body>
            {selectedIdPurchaseOrder &&
              <VerifyRentItems
                updateActiveKeys={updateActiveKeys}
                selectedIdPurchaseOrder={selectedIdPurchaseOrder}
                setSelectedIdPurchaseOrder={setSelectedIdPurchaseOrder}
                rents={rents}
                purchaseOrders={purchaseOrders}
                clients={clients}
                articlesOrders={articlesOrders}
                accesoriesOrders={accesoriesOrders}
                articles={articles}
                accesories={accesories}
                statusNegativeRecords={statusNegativeRecords}
                tableData={tableData}
                updateTableData={updateTableData}
              />
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  )
}

export default RentalRefund