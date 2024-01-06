import ButtonCataComponente from "../components/provider/Button/Button"
import { Button } from "react-bootstrap";
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

function formatearFecha(fecha) {
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-CO', { timeZone: 'UTC' })
  return `${fechaFormateada} `;
}

const createReport = async (data) => {
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

  XLSX.writeFile(libro, `reporte.xlsx`);
}



const handleReport = async () => {
  const data = await getReportData()
  createReport(data)
}



const Reports = () => {
  return (<>
    <ButtonCataComponente title={'Abonos y Totales'} type={'button'} onClick={() => { subsidies_balances() }}></ButtonCataComponente>
    <ButtonCataComponente title={'Gastos'} type={'button'} onClick={() => { spent() }}></ButtonCataComponente>
    <Button onClick={handleReport}>Generar Reporte</Button>
  </>)
}

export default Reports
