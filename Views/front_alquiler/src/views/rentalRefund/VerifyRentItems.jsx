import { useEffect, useState } from 'react'
import { getArticlesAccesoriesByIdPurchaseOrder } from '../../utils/utils'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'

const VerifyRentItems = ({
  updateActiveKeys,
  selectedIdPurchaseOrder,
  articlesOrders,
  accesoriesOrders,
  articles,
  accesories,
  negativeRecord,
}) => {
  const [articlesTable, setArticlesTable] = useState(null)
  const [accesoriesTable, setAccesoriesTable] = useState(null)

  useEffect(() => {
    if (
      selectedIdPurchaseOrder &&
      articlesOrders &&
      accesoriesOrders &&
      articles &&
      accesories
    ) {
      const { filteredArticles, filteredAccesories } = getArticlesAccesoriesByIdPurchaseOrder(
        selectedIdPurchaseOrder,
        articlesOrders,
        accesoriesOrders,
        articles,
        accesories,
      )
      setArticlesTable(filteredArticles)
      setAccesoriesTable(filteredAccesories)
    }
  }, [selectedIdPurchaseOrder,
    articlesOrders,
    accesoriesOrders,
    articles,
    accesories,])
  // console.log("Hello:", negativeRecord)
  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Button variant='warning'>Atrás</Button>
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
      {negativeRecord &&
        <Row>
          {negativeRecord.map((record, index) =>
            <Col key={index}>
              <Button variant='primary'>{record.Descripcion}</Button>
            </Col>
          )}
        </Row>
      }
    </Container>
  )
}

export default VerifyRentItems