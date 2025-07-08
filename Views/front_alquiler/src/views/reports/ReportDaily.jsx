import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const getReportData = async () => {
  const URL = "http://localhost:3003/reportDaily";
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data); // ✅ revisa estructura en consola
    return data;
  } catch (error) {
    console.log(error);
  }
};

const ReportDaily = () => {
  const [report, setReport] = useState({
    totalEfectivo: { efectivo: 0 },
    efectivoPorNombre: [],
    gastosHoy: { totalGastosHoy: 0 },
  });

  const fetchReport = async () => {
    const data = await getReportData();
    if (data) setReport(data);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const totalEfectivo = report.totalEfectivo?.efectivo ?? 0;
  const totalGastosHoy = report.gastosHoy?.totalGastosHoy ?? 0;
  const neto = totalEfectivo - totalGastosHoy;

  return (
    <Container>
      <Row className="text-center mt-3 mb-3">
        <h3>Entrega de cuentas diarias</h3>
      </Row>

      <Row>
        <Col>
          <Button variant="primary" onClick={fetchReport}>
            Actualizar
          </Button>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <h5>Total efectivo: ${totalEfectivo}</h5>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <h5>Total gastos hoy: ${totalGastosHoy}</h5>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <h5>Neto (efectivo - gastos hoy): ${neto}</h5>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Efectivo total</th>
              </tr>
            </thead>
            <tbody>
              {report.efectivoPorNombre.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.nombre}</td>
                  <td>{item.efectivo_total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportDaily;
