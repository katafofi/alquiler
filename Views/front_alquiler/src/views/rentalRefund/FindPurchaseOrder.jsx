import { useEffect, useState, useMemo, useCallback } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

const initTableDataRange = { init: 1, final: 10 };

const FindPurchaseOrder = ({
  tableData,
  updateActiveKeys,
  setSelectedIdPurchaseOrder
}) => {
  const [inputFilter, setInputFilter] = useState('');
  const [filteredTableData, setFilteredTableData] = useState(null);
  const [tableDataRange, setTableDataRange] = useState(initTableDataRange);
  const [page, setPage] = useState(1);

  const NEXTKEYS = ['1'];

  const filteredData = useMemo(() => {
    if (!tableData) return null;
    return tableData.filter(data => data.idPurchaseOrder && data.idEstadoAlquiler === 1 && data.negativeRecord === null);
  }, [tableData]);

  useEffect(() => {
    setFilteredTableData(filteredData);
  }, [filteredData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const filtered = filteredData.filter(data => (data.name + data.lastName)
      .toLowerCase()
      .replaceAll(" ", "")
      .includes(inputFilter.toLowerCase().replaceAll(" ", "")));
    setFilteredTableData(filtered);
    setTableDataRange(initTableDataRange);
    setPage(1);
  }, [filteredData, inputFilter]);

  const handlePage = useCallback(({ target }) => {
    const { name } = target;
    setPage(prevPage => name === "next" ? prevPage + 1 : prevPage - 1);
  }, []);

  const handleSelect = useCallback((idPurchaseOrder) => {
    setSelectedIdPurchaseOrder(idPurchaseOrder);
    updateActiveKeys(NEXTKEYS);
  }, [setSelectedIdPurchaseOrder, updateActiveKeys]);

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={3}>
              <Form.Control onChange={(e) => setInputFilter(e.target.value)} />
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
                    disabled={page === 1}
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
                    disabled={page === Math.ceil(filteredTableData.length / 10)}
                  >
                    Siguiente
                  </Button>
                </Col>
              </>
            }
          </Row>
        </Form>
      </Row>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Fecha Inicial</th>
              <th>Fecha Final</th>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Orden compra</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {filteredTableData &&
              filteredTableData.slice((page - 1) * 10, page * 10).map((row, index) => (
                <tr key={index}>
                  <td>{row.initialDate}</td>
                  <td>{row.finalDate}</td>
                  <td>{row.cedula}</td>
                  <td>{row.name} {row.lastName}</td>
                  <td>{row.idPurchaseOrder}</td>
                  <td>
                    <Button onClick={() => handleSelect(row.idPurchaseOrder)}>
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
  );
};

export default FindPurchaseOrder;