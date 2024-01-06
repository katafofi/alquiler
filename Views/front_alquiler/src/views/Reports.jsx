import ButtonCataComponente from "../components/provider/Button/Button"
import { Button } from "react-bootstrap";
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

// const createReport = async (data) => {
//   const workbook = await XLSXPopulate.fromBlankAsync();
//   const sheet = workbook.sheet(0);
// }

const handleReport = async () => {
  const data = await getReportData()
  // await createReport(data)
  console.log(data)
}

const Reports = () => {
  return (<>
    <ButtonCataComponente title={'Abonos y Totales'} type={'button'} onClick={() => { subsidies_balances() }}></ButtonCataComponente>
    <ButtonCataComponente title={'Gastos'} type={'button'} onClick={() => { spent() }}></ButtonCataComponente>
    <Button onClick={handleReport}>Generar Reporte</Button>
  </>)
}

export default Reports
