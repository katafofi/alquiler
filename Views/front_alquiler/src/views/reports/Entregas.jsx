import { useState } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";

const getEntregasData = async (fechaInicio, fechaFin) => {
  const URL = `http://localhost:3003/entregas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const Entregas = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [data, setData] = useState({
    entregas: [],
    total: 0,
  });

  // ✅ estado para filas marcadas
  const [checkedRows, setCheckedRows] = useState({});

  const toggleCheck = (idOrden, index) => {
    const key = `${idOrden}-${index}`;
    setCheckedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const fetchEntregas = async () => {
    if (!fechaInicio || !fechaFin) {
      alert("Seleccione ambas fechas");
      return;
    }

    const result = await getEntregasData(fechaInicio, fechaFin);
    if (result) {
      setData(result);
      setCheckedRows({}); // reset checks
    }
  };

  return (
    <Container>
      {/* TITULO */}
      <Row className="text-center mt-3 mb-3">
        <h3>Reporte de Entregas</h3>
      </Row>

      {/* FECHAS */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Fecha Inicio</Form.Label>
          <Form.Control
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </Col>

        <Col md={4}>
          <Form.Label>Fecha Fin</Form.Label>
          <Form.Control
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </Col>

        <Col md={4} className="d-flex align-items-end">
          <Button variant="primary" onClick={fetchEntregas}>
            Buscar
          </Button>
        </Col>
      </Row>

      {/* TOTAL */}
      <Row className="mb-3">
        <Col>
          <h5>Total entregas: {data.total}</h5>
        </Col>
      </Row>

      {/* TABLA */}
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>✔</th>
                <th>Fecha</th>
                <th>ID Cliente</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Orden</th>
                <th>Artículo</th>
              </tr>
            </thead>

            <tbody>
              {data.entregas.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No hay entregas
                  </td>
                </tr>
              )}

              {data.entregas.map((e, idx) => {
                const key = `${e.IdOrdenCompra}-${idx}`;
                const checked = checkedRows[key];

                return (
                  <tr
                    key={key}
                    className={checked ? "table-success" : ""}
                  >
                    <td className="text-center">
                      <Form.Check
                        type="checkbox"
                        checked={checked || false}
                        onChange={() =>
                          toggleCheck(e.IdOrdenCompra, idx)
                        }
                      />
                    </td>
                    <td>{e.FechaInicialAlquiler?.split("T")[0]}</td>
                    <td>{e.IdCliente}</td>
                    <td>{e.Nombre}</td>
                    <td>{e.Apellido}</td>
                    <td>{e.IdOrdenCompra}</td>
                    <td>{e.ArticuloDescripcion}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Entregas;
