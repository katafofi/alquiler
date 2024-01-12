import { useEffect, useState } from 'react'
import { getNegativeRecordInfo } from '../../utils/utils'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'

const VerifyRentItems = ({
  updateActiveKeys,
  selectedIdPurchaseOrder,
  setSelectedIdPurchaseOrder,
  rents,
  purchaseOrders,
  clients,
  articlesOrders,
  accesoriesOrders,
  articles,
  accesories,
  statusNegativeRecords,
}) => {
  const [articlesTable, setArticlesTable] = useState(null)
  const [accesoriesTable, setAccesoriesTable] = useState(null)
  const [IdCliente, setIdCliente] = useState(null)

  const FORM = "negativeRecord"
  const PORT = "3003";
  const URL = "http://localhost:";

  const PREVKEYS = ['0']

  useEffect(() => {
    if (
      selectedIdPurchaseOrder &&
      articlesOrders &&
      accesoriesOrders &&
      articles &&
      accesories
    ) {
      const { filteredArticles, filteredAccesories, selectedClientId } = getNegativeRecordInfo(
        selectedIdPurchaseOrder,
        rents,
        purchaseOrders,
        clients,
        articlesOrders,
        accesoriesOrders,
        articles,
        accesories,
      )
      setArticlesTable(filteredArticles)
      setAccesoriesTable(filteredAccesories)
      setIdCliente(selectedClientId)
    }
  }, [
    selectedIdPurchaseOrder,
    articlesOrders,
    accesoriesOrders,
    articles,
    accesories,
  ])

  const handleBack = () => {
    updateActiveKeys(PREVKEYS)
    setSelectedIdPurchaseOrder(null)
  }

  const handleCreate = async (IdEstadoRegistroNegativo) => {
    try {
      const response = await fetch(`${URL}${PORT}/${FORM}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ IdCliente, IdEstadoRegistroNegativo }),
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (idNegativeRecord) => {
    try {
      const data = await handleCreate(idNegativeRecord);
      if (data) updateActiveKeys(PREVKEYS)
    } catch (error) {
      console.error("Error al crear:", error);
    }

  };


  // console.log("Hello:", statusNegativeRecords)
  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Button variant='warning' onClick={handleBack}>Atrás</Button>
        </Col>
      </Row>
      <Row>
        {articlesTable &&
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Articulo</th>
                  <th>Verifiación</th>
                </tr>
              </thead>
              <tbody>
                {articlesTable.map((article, index) =>
                  <tr key={index}>
                    <td>{article.amount}</td>
                    <td>{article.description}</td>
                    <td>
                      <Form.Check />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        }
        {accesoriesTable &&
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Accesorio</th>
                  <th>Verifiación</th>
                </tr>
              </thead>
              <tbody>
                {accesoriesTable.map((accesory, index) =>
                  <tr key={index}>
                    <td>{accesory.amount}</td>
                    <td>{accesory.description}</td>
                    <td>
                      <Form.Check />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        }
      </Row>
      {statusNegativeRecords &&
        <Row>
          {statusNegativeRecords.map((statusNegativeRecord, index) =>
            <Col key={index}>
              <Button
                variant='primary'
                onClick={() => handleSubmit(statusNegativeRecord.IdEstadoRegistroNegativo)}
              >
                {statusNegativeRecord.Descripcion}
              </Button>
            </Col>
          )}
        </Row>
      }
    </Container>
  )
}

export default VerifyRentItems