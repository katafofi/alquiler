const excel = require('exceljs');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

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
    // Consulta para idestadopago = 1
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
      WHERE DATE(P.FechadPago) = CURDATE()  -- Filtra por la fecha actual
        AND EP.IdEstadoPago = 1;  -- Filtra por idestadopago igual a 1
    `);

    // Consulta para idestadopago = 2
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
      WHERE DATE(P.FechadPago) = CURDATE()  -- Filtra por la fecha actual
        AND EP.IdEstadoPago = 2;  -- Filtra por idestadopago igual a 2
    `);

    const workbook = new excel.Workbook();

    // Hoja de cálculo para idestadopago = 1 (renombrada a 'abono')
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

    // Hoja de cálculo para idestadopago = 2 (renombrada a 'saldos')
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

    // Genera un nombre único para el archivo usando la fecha actual (renombrado a 'reporte')
    const currentDate = new Date().toISOString().split('T')[0];
    const fileName = `reporte_${currentDate}_${uuidv4()}.xlsx`;

    const filepath = path.join(__dirname, fileName)

    // Guarda el archivo Excel con el nombre generado
    await workbook.xlsx.writeFile(filepath);
    console.log(`Archivo Excel generado exitosamente: ${fileName}`);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message);
  } finally {
    connection.release();
  }
}

module.exports = exportToExcel