const excel = require('exceljs');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'cata',
  database: 'Alquiler2',
  password: 'cata2047901*',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function exportToExcel() {
  const connection = await pool.getConnection();

  try {
    const [result1] = await connection.query(`
      SELECT 
        P.FechadPago, 
        OC.IdOrdenCompra,
        P.Valor AS abonado_saldo, 
        OC.Total AS total_alquiler,
        EP.Descripcion AS estadopago, 
        TP.Descripcion AS tipopago, 
        p.createdAt
      FROM pagos AS P
      INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago)
      INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago)
      INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra)
      WHERE WEEK(P.FechadPago) = WEEK(CURDATE())  -- Filtra por la semana actual
        AND EP.IdEstadoPago = 1;  -- Filtra por idestadopago igual a 1
    `);

    const [result2] = await connection.query(`
      SELECT 
        P.FechadPago, 
        OC.IdOrdenCompra,
        P.Valor AS abonado_saldo, 
        OC.Total AS total_alquiler,
        EP.Descripcion AS estadopago, 
        TP.Descripcion AS tipopago, 
        p.createdAt
      FROM pagos AS P
      INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago)
      INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago)
      INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra)
      WHERE WEEK(P.FechadPago) = WEEK(CURDATE())  -- Filtra por la semana actual
        AND EP.IdEstadoPago = 2;  -- Filtra por idestadopago igual a 2
    `);

    const workbook = new excel.Workbook();

    const worksheet1 = workbook.addWorksheet('abono');
    const columnOrder1 = [
      'FechadPago',
      'IdOrdenCompra',
      'abonado_saldo',
      'total_alquiler',
      'estadopago',
      'tipopago',
      'createdAt'
    ];
    worksheet1.columns = columnOrder1.map(column => ({ header: column, key: column }));
    worksheet1.addRows(result1);

    const worksheet2 = workbook.addWorksheet('saldos');
    const columnOrder2 = [
      'FechadPago',
      'IdOrdenCompra',
      'abonado_saldo',
      'total_alquiler',
      'estadopago',
      'tipopago',
      'createdAt'
    ];
    worksheet2.columns = columnOrder2.map(column => ({ header: column, key: column }));
    worksheet2.addRows(result2);

    const currentDate = new Date().toISOString().split('T')[0];
    const fileName = `reporte_semanal_${currentDate}.xlsx`;

    await workbook.xlsx.writeFile(fileName);
    console.log(`Archivo Excel generado exitosamente: ${fileName}`);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message);
  } finally {
    connection.release();
  }
}

exportToExcel();

 
  