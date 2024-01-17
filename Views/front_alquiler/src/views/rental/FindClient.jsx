import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'

const initTableDataRange = { init: 1, final: 10 }

const FindClient = ({ tableData, setNews }) => {
  const [inputFilter, setInputFilter] = useState(null)
  const [filteredTableData, setFilteredTableData] = useState(null)
  const [tableDataRange, setTableDataRange] = useState(initTableDataRange)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (tableData) setFilteredTableData(tableData.reverse())
  }, [tableData])

  useEffect(() => {
    if (filteredTableData) {
      setTableDataRange({
        init: filteredTableData.length < 10
          ? 0
          : page === 1
            ? 0
            : (page - 1) * 10,
        final: filteredTableData.length < 10
          ?
          filteredTableData.length
          :

          page === Math.floor(filteredTableData.length / 10) + 1
            ?
            (page - 1) * 10 + filteredTableData.length % 10
            :
            (page - 1) * 10 + 10
      })
    }
  }, [page, filteredTableData])

  const handleChange = ({ target }) => setInputFilter(target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFilteredTableData(tableData.filter(data => (
      data.label).toLowerCase().replaceAll(" ", "").includes(inputFilter.toLowerCase().replaceAll(" ", ""))))
    setTableDataRange(initTableDataRange)
    setPage(1)
  }

  const handlePage = ({ target }) => {
    const { name } = target
    if (name === "next") {
      setPage(page + 1)
    } else {
      setPage(page - 1)
    }
  }

  const handleSelect = (idCliente) => {
    setNews((prev) => ({ ...prev, IdCliente: idCliente }))
  }

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={3}>
              <Form.Control onChange={handleChange} placeholder='Buscar por nombre' />
            </Col>
            <Col xs={1}>
              <Button variant="primary" type="submit">Buscar</Button>
            </Col>
            <Col xs={4}></Col>
            {filteredTableData &&
              <>
                <Col xs={1}>
                  <Button
                    variant="dark"
                    onClick={handlePage}
                    name="prev"
                    disabled={page === 1 ? true : false}
                  >
                    Atrás
                  </Button>
                </Col>
                <Col xs={1}>
                  <p className='text-center'>Página: <strong>{page}</strong></p>
                </Col>
                <Col xs={1}>
                  <Button
                    variant="dark"
                    onClick={handlePage}
                    name="next"
                    disabled={
                      filteredTableData.length < 10
                        ? true
                        : page === Math.floor(filteredTableData.length / 10) + 1 && filteredTableData.length % 10 > 0
                          ? true
                          : false
                    }
                  >Siguiente
                  </Button>
                </Col>
              </>
            }
          </Row>
        </Form>
      </Row>
      <Row>
        <Table >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredTableData &&
              filteredTableData.slice(tableDataRange.init, tableDataRange.final).map((row, index) => (
                <tr key={index}>
                  <td>{row.value}</td>
                  <td>{row.label}</td>
                  <td>
                    <Button onClick={() => handleSelect(row.value)}>
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Row>

    </Container>
  )
}

export default FindClient