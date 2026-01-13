import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const getEntregasData = async (fechaInicio, fechaFin) => {
  const URL = `http://localhost:3003/entregas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
  const response = await fetch(URL);
  return await response.json();
};

const estados = {
  alistamiento: "En alistamiento",
  listo: "Listo para entrega",
  entregado: "Entregado",
};

const colorFila = (estado) => {
  if (estado === "entregado") return "table-success";
  if (estado === "listo") return "table-info";
  if (estado === "alistamiento") return "table-warning";
  return "";
};

const Entregas = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [data, setData] = useState({ entregas: [], total: 0 });
  const [estadoEntrega, setEstadoEntrega] = useState({});

  /* 🔹 CARGAR ESTADOS GUARDADOS */
  useEffect(() => {
    const guardado = localStorage.getItem("estadoEntregas");
    if (guardado) {
      setEstadoEntrega(JSON.parse(guardado));
    }
  }, []);

  /* 🔹 GUARDAR CADA CAMBIO */
  useEffect(() => {
    localStorage.setItem("estadoEntregas", JSON.stringify(estadoEntrega));
  }, [estadoEntrega]);

  /* 🔹 LIMPIAR CUANDO CAMBIAN LAS FECHAS */
  useEffect(() => {
    if (fechaInicio && fechaFin) {
      setEstadoEntrega({});
      localStorage.removeItem("estadoEntregas");
    }
  }, [fechaInicio, fechaFin]);

  const fetchEntregas = async () => {
    if (!fechaInicio || !fechaFin) {
      alert("Seleccione ambas fechas");
      return;
    }

    const result = await getEntregasData(fechaInicio, fechaFin);
    if (result) setData(result);
  };

  const cambiarEstado = (idx, valor) => {
    setEstadoEntrega({
      ...estadoEntrega,
      [idx]: valor,
    });
  };

  const exportarExcel = () => {
    const rows = data.entregas.map((e, idx) => ({
      Fecha: e.FechaInicialAlquiler?.split("T")[0],
      IdCliente: e.IdCliente,
      Nombre: e.Nombre,
      Apellido: e.Apellido,
      Orden: e.IdOrdenCompra,
      Articulo: e.ArticuloDescripcion,
      Estado: estados[estadoEntrega[idx]] || "Sin definir",
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entregas");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "reporte_entregas.xlsx");
  };

  return (
    <Container>
      <Row className="text-center mt-3 mb-3">
        <h3>Reporte de Entregas</h3>
      </Row>

      {/* FECHAS */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Fecha Inicio</Form.Label>
          <Form.Control type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        </Col>

        <Col md={4}>
          <Form.Label>Fecha Fin</Form.Label>
          <Form.Control type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
        </Col>

        <Col md={4} className="d-flex align-items-end gap-2">
          <Button onClick={fetchEntregas}>Buscar</Button>
          <Button variant="success" onClick={exportarExcel}>
            Exportar Excel
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h5>Total entregas: {data.total}</h5>
        </Col>
      </Row>

      {/* TABLA */}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>ID Cliente</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Orden</th>
            <th>Artículo</th>
            <th>Estado</th>
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

          {data.entregas.map((e, idx) => (
            <tr key={idx} className={colorFila(estadoEntrega[idx])}>
              <td>{e.FechaInicialAlquiler?.split("T")[0]}</td>
              <td>{e.IdCliente}</td>
              <td>{e.Nombre}</td>
              <td>{e.Apellido}</td>
              <td>{e.IdOrdenCompra}</td>
              <td>{e.ArticuloDescripcion}</td>
              <td>
                <Form.Select
                  value={estadoEntrega[idx] || ""}
                  onChange={(ev) => cambiarEstado(idx, ev.target.value)}
                >
                  <option value="">Seleccione</option>
                  <option value="alistamiento">En alistamiento</option>
                  <option value="listo">Listo para entrega</option>
                  <option value="entregado">Entregado</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Entregas;
