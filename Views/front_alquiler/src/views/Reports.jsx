import { useEffect } from "react"
import ButtonCataComponente from "../components/provider/Button/Button"

const subsidies_balances = async () => {
    const form = "payments";
    const URL = "http://localhost:";
    const PORT = "3003";
    try {
        const response = await fetch(`${URL}${PORT}/${form}/abonos_saldos`);
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

const spent = async () => {
    const form = "expense_employe";
    const URL = "http://localhost:";
    const PORT = "3003";
    try {
        const response = await fetch(`${URL}${PORT}/${form}/gastos_empleados`);
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

const Reports = () => {
    return (<>
        <ButtonCataComponente title={'Abonos y Totales'} type={'button'} onClick={() => {subsidies_balances()}}></ButtonCataComponente>
        <ButtonCataComponente title={'Gastos'} type={'button'} onClick={() => {spent()}}></ButtonCataComponente>
    </>)
}

export default Reports  
