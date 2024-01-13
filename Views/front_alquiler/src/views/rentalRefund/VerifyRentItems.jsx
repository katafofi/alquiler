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
  tableData,
  updateTableData
}) => {
  const [articlesTable, setArticlesTable] = useState(null)
  const [accesoriesTable, setAccesoriesTable] = useState(null)
  const [IdCliente, setIdCliente] = useState(null)
  const [IdAlquiler, setIdAlquiler] = useState(null)

  const FORM = "negativeRecord"
  const FORMRENTING = "renting"
  const EMAILFORM = "send-email"
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
      const { filteredArticles, filteredAccesories, selectedClientId, selectedRentId } = getNegativeRecordInfo(
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
      setIdAlquiler(selectedRentId)
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

  const getEmailInfo = (idNegativeRecord, IdOrdenCompra) => {
    const newClient = clients.find(client => client.IdCliente == rents.find(rent => rent.IdAlquiler == IdAlquiler).IdCliente)

    const newNegativeRecord = statusNegativeRecords.find(el => el.IdEstadoRegistroNegativo == idNegativeRecord)

    const newEmailInfo = {
      IdCliente: newClient.IdCliente,
      cedula: newClient.Cedula,
      name: newClient.Nombre,
      lastName: newClient.Apellido,
      description: newNegativeRecord.Descripcion,
      createdAt: (new Date()).toLocaleDateString('es-CO', { timeZone: 'UTC' }),
    }

    return newEmailInfo
  }

  const sendNegativeRecord = async (emailData) => {
    try {
      const response = await fetch(`${URL}${PORT}/${EMAILFORM}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log("Ha ocurrido un error al enviar el email.", error);
    }
  }

  const updateRent = async (IdAlquiler) => {
    const updatedRent = rents.find(rent => rent.IdAlquiler === IdAlquiler)
    try {
      const response = await fetch(`${URL}${PORT}/${FORMRENTING}/${IdAlquiler}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedRent,
          IdEstadoAlquiler: 2
        }),
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreate = async (IdEstadoRegistroNegativo) => {
    try {
      const response = await fetch(`${URL}${PORT}/${FORM}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdCliente,
          IdEstadoRegistroNegativo,
          IdOrdenCompra: selectedIdPurchaseOrder,
          IdAlquiler
        }),
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (idNegativeRecord) => {
    try {
      const negativeRecordData = await handleCreate(idNegativeRecord);
      const rentData = await updateRent(IdAlquiler)
      updateTableData(tableData
        .map(el => el.idPurchaseOrder === negativeRecordData.IdOrdenCompra
          ? { ...el, negativeRecord: negativeRecordData }
          : el
        ))
      if (idNegativeRecord !== 1) sendNegativeRecord(getEmailInfo(idNegativeRecord, negativeRecordData.IdOrdenCompra))
      if (negativeRecordData) updateActiveKeys(PREVKEYS)
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

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