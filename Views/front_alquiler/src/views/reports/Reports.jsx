import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as XLSX from "xlsx";
import DailyReport from "./DailyReport";
import ButtonCataComponente from "../../components/provider/Button/Button";

const subsidies_balances = async () => {
  const FORM = "payments";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}/abonos_saldos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const spent = async () => {
  const FORM = "expense_employe";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}/gastos_empleados`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getReportData = async () => {
  const FORM = "report";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getReportDataWeek = async (formData) => {
  const FORM = "report/week";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function formatearFecha(fecha) {
  const fechaFormateada = new Date(fecha).toLocaleDateString("es-CO", {
    timeZone: "UTC",
  });
  return `${fechaFormateada}`;
}

const createReport = async (data, reportType) => {
  const libro = XLSX.utils.book_new();

  const hojaDia = XLSX.utils.json_to_sheet(data.dia.map((row) => ({ ...row })));
  const hojaAbonos = XLSX.utils.json_to_sheet(data.abonos.map((row) => ({ ...row })));
  const hojaSaldos = XLSX.utils.json_to_sheet(data.saldos.map((row) => ({ ...row })));
  const hojaGastos = XLSX.utils.json_to_sheet(
    data.gastos.map((row) => (({ createdAt, ...rest }) => rest)(row))
  );
  const hojaSalidas = XLSX.utils.json_to_sheet(
    data.salidas.map((row) => (({ createdAt, ...rest }) => rest)(row))
  );

  XLSX.utils.book_append_sheet(libro, hojaDia, "DIA");
  XLSX.utils.book_append_sheet(libro, hojaAbonos, "ABONOS");
  XLSX.utils.book_append_sheet(libro, hojaGastos, "GASTOS");
  XLSX.utils.book_append_sheet(libro, hojaSaldos, "SALDOS");
  XLSX.utils.book_append_sheet(libro, hojaSalidas, "SALIDAS");

  const hojaCuentasSemanaNueva = XLSX.utils.json_to_sheet([
    {
      ABONO: data.abonoTotal[0].ABONO_TOTAL,
      SALDO: data.saldoTotal[0].SALDO_TOTAL,
      SUMA: data.granTotal[0].SUMA_GENERAL,
      GASTOS: data.gastoTotal[0].TOTAL_GASTOS_SEMANA,
      TOTAL: data.diferenciaTotal[0].TOTAL,
    },
    ...data.cuentasSemana.map((row) => ({ ...row })),
  ]);

  XLSX.utils.book_append_sheet(libro, hojaCuentasSemanaNueva, "CUENTAS SEMANA");
  XLSX.writeFile(libro, `reporte_${reportType}.xlsx`);
};

// 🧩 Modal personalizado para credencial (reemplaza prompt)
const solicitarCredencial = () => {
  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0, 0, 0, 0.5)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "9999";

    modal.innerHTML = `
      <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
        <h5>Ingrese la credencial de autorización</h5>
        <input id="credInput" type="password" placeholder="Contraseña" style="padding: 8px; margin: 10px 0; width: 80%;" />
        <br/>
        <button id="confirmBtn" style="margin-right: 10px; padding: 6px 12px;">Confirmar</button>
        <button id="cancelBtn" style="padding: 6px 12px;">Cancelar</button>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#confirmBtn").onclick = () => {
      const valor = modal.querySelector("#credInput").value;
      document.body.removeChild(modal);
      resolve(valor);
    };

    modal.querySelector("#cancelBtn").onclick = () => {
      document.body.removeChild(modal);
      resolve(null);
    };
  });
};

const initFormData = () => {
  let initialDate = new Date();
  let finalDate = new Date();
  initialDate.setDate(initialDate.getDate() - 7);
  return {
    initialDate: initialDate.toISOString().split("T")[0],
    finalDate: finalDate.toISOString().split("T")[0],
  };
};

const Reports = () => {
  const [formData, setFormData] = useState(initFormData());

  const handleReport = async (e) => {
    e.preventDefault();

    // 🔒 Credencial oculta
    const cred = await solicitarCredencial();
    if (cred === "cata2047901*") {
      const data = await getReportDataWeek(formData);
      createReport(data, "generalSemanal");
    } else {
      alert("⚠️ Credencial incorrecta o cancelada.");
    }
  };

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <Container>
      <Row className="text-center mt-3 mb-3">
        <h3>Reportes</h3>
      </Row>
      <Form onSubmit={handleReport}>
        <Row className="mb-5">
          <Col>
            <Form.Group>
              <Form.Label>Fecha Inicial</Form.Label>
              <Form.Control
                type="date"
                value={formData.initialDate}
                name="initialDate"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Fecha Final</Form.Label>
              <Form.Control
                type="date"
                value={formData.finalDate}
                name="finalDate"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col className="d-flex align-items-end">
            <Button type="submit">Generar Reporte</Button>
          </Col>
        </Row>
      </Form>

      <Row className="text-center mb-3">
        <h3>Reporte del Día</h3>
      </Row>
      <Row>
        <DailyReport getReportDataWeek={getReportDataWeek} />
      </Row>
    </Container>
  );
};

export default Reports;
