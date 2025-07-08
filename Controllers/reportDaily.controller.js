const mysql = require('mysql2/promise');

async function getReportDaily(req, res) {
  let conexion;

  try {
    conexion = await mysql.createConnection({
      host: 'localhost',
      user: 'cata',
      password: 'cata2047901*',
      database: 'Alquiler2',
    });

    // Consulta 1: Total efectivo
    const [totalEfectivo] = await conexion.execute(`
      SELECT IFNULL(SUM(pagos.Valor), 0) AS efectivo
      FROM pagos
      INNER JOIN tipopagos ON pagos.IdTipoPago = tipopagos.IdTipoPago
      WHERE DATE(pagos.FechadPago) = CURDATE()
        AND tipopagos.Descripcion = 'efectivo';
    `);

    // Consulta 2: Listado de nombres con sumatoria
    const [efectivoPorNombre] = await conexion.execute(`
      SELECT nombre, SUM(Valor) AS efectivo_total
      FROM pagos
      WHERE IdTipoPago = 3
        AND DATE(FechadPago) = CURDATE()
      GROUP BY nombre;
    `);

    // Consulta 3: Suma de gastos del día
    const [gastosHoy] = await conexion.execute(`
      SELECT IFNULL(SUM(Monto), 0) AS totalGastosHoy
      FROM gastosempleados
      WHERE Fecha = CURDATE();
    `);

    // Respuesta estructurada
    res.status(200).json({
      totalEfectivo: totalEfectivo[0], 
      efectivoPorNombre,
      gastosHoy: gastosHoy[0] // 👈 agrega en el JSON
    });

  } catch (error) {
    console.error('Error en getReportDaily:', error);
    res.status(500).json({ error: 'Error interno del servidor' });

  } finally {
    if (conexion) await conexion.end();
  }
}

module.exports = { getReportDaily };
