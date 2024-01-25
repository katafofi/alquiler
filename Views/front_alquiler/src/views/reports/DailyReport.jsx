import { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'

const DailyReport = ({ getReportDataWeek }) => {
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const getDailyReport = async () => {
      try {
        let today = new Date()
        today = `${today.getUTCFullYear()}-${today.getUTCMonth() < 9 ? "0" + (today.getUTCMonth() + 1) : today.getUTCMonth() + 1}-${today.getUTCDate()}`
        const data = await getReportDataWeek({ initialDate: today, finalDate: today })
        const day = data.dia
        setDailyData(day)
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    getDailyReport()
  }, [])

  return (
    <Container>
      {dailyData.length > 0 ?
        <Table>
          <thead>
            <tr>
              {Object.keys(dailyData[0]).map((title, index) =>
                <th key={index}>
                  {title}
                </th>)}
            </tr>
          </thead>
          <tbody>
            {dailyData.map((data, index) =>
              <tr key={index}>
                <td >
                  {data.FECHA}
                </td>
                <td >
                  {data.ORDEN}
                </td>
                <td >
                  {data.FECHA_SALIDA}
                </td>
                <td >
                  {data.VALOR_FACTURA}
                </td>
                <td >
                  {data.ABONO}
                </td>
                <td >
                  {data.SALDO}
                </td>
                <td >
                  {data.TIPOPAGO}
                </td>
                <td >
                  {data.FECHA_CREACION}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        : <p>Esperando los datos del día...</p>
      }
    </Container>
  )
}

export default DailyReport