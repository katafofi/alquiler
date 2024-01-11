import ButtonCataComponente from "../components/provider/Button/Button"
import { Button, Col, Container, Row } from "react-bootstrap";
import * as XLSX from 'xlsx'
// import ReportPreview from "./report/ReportPreview";
// import XLSXPopulate from "xlsx-populate";

const subsidies_balances = async () => {
  const FORM = "payments";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}/abonos_saldos`);
    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}

const spent = async () => {
  const FORM = "expense_employe";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}/gastos_empleados`);
    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}

const getReportData = async () => {
  const FORM = "report";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

const getReportDataWeek = async () => {
  const FORM = "report/week";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

function formatearFecha(fecha) {
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-CO', { timeZone: 'UTC' })
  return `${fechaFormateada} `;
}

const createReport = async (data, reportType) => {
  const libro = XLSX.utils.book_new();
  const hojaDia = XLSX.utils.json_to_sheet(data.dia.map(row => ({
    ...row,
    FechadPago: formatearFecha(row.FechadPago),
    createdAt: formatearFecha(row.createdAt),
  })));

  // Agregar el resultado de SALDO_TOTAL a la hoja de ABONOS
  const hojaAbonos = XLSX.utils.json_to_sheet([
    ...data.abonos.map(row => ({
      ...row,
      FechadPago: formatearFecha(row.FechadPago),
    })),
  ]);

  // Crea una hoja de Excel con los resultados de 'SALDOS'
  const hojaSaldos = XLSX.utils.json_to_sheet(data.saldos.map(row => ({
    ...row,
    FechadPago: formatearFecha(row.FechadPago),
  })));

  // Crea una hoja de Excel con los resultados de 'GASTOS'
  const hojaGastos = XLSX.utils.json_to_sheet(data.gastos.map(row => ({
    ...row,
    createdAt: formatearFecha(row.createdAt),
  })));

  XLSX.utils.book_append_sheet(libro, hojaDia, 'DIA');
  XLSX.utils.book_append_sheet(libro, hojaAbonos, 'ABONOS');
  XLSX.utils.book_append_sheet(libro, hojaGastos, 'GASTOS');
  XLSX.utils.book_append_sheet(libro, hojaSaldos, 'SALDOS');

  if (reportType === 'semanal') {
    // Crear una nueva hoja 'CUENTAS SEMANA' con el resultado de SALDO_TOTAL y ABONO_TOTAL
    const hojaCuentasSemanaNueva = XLSX.utils.json_to_sheet([
      { ABONO: data.abonoTotal[0].ABONO_TOTAL,
        SALDO: data.saldoTotal[0].SALDO_TOTAL, 
        SUMA: data.granTotal[0].SUMA_GENERAL, 
        GASTOS: data.gastoTotal[0].TOTAL_GASTOS_SEMANA,
        TOTAL: data.diferenciaTotal[0].TOTAL
        }, // Agrega SALDO_TOTAL y ABONO_TOTAL como nuevas columnas
      // Puedes agregar más transformaciones si es necesario
      ...data.cuentasSemana.map(row => ({
        ...row,
        // Puedes agregar más transformaciones si es necesario
      }
      )),
    ]);
    XLSX.utils.book_append_sheet(libro, hojaCuentasSemanaNueva, 'CUENTAS SEMANA');
  }



  XLSX.writeFile(libro, `reporte_${reportType}.xlsx`);
}


const handleReport = async () => {
  const data = await getReportData()
  createReport(data, "general")
}

const handleReportWeek = async () => {
  const data = await getReportDataWeek()
  createReport(data, "semanal")
}

const Reports = () => {
  return (<Container>
    <Row><h3>Reportes</h3></Row>
    <Row>
      <Col><Button onClick={handleReport}>Generar Reporte</Button></Col>
      <Col><Button onClick={handleReportWeek}>Generar Reporte Semamal</Button></Col>
    </Row>
  </Container>)
}

export default Reports
