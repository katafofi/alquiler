const mysql = require('mysql2/promise');

const getDefaultResponse = (req, res) => {
  res.status(200).json({ message: "Respuesta desde Report" });
};

function formatearFecha(fecha) {
  const opcionesFecha = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const fechaFormateada = new Intl.DateTimeFormat('es-CO', opcionesFecha).format(fecha);
  return `${fechaFormateada} `;
}

async function generarReporte(req, res) {
  // Configuración de la conexión a la base de datos
  const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'cata',
    password: 'cata2047901*',
    database: 'Alquiler2',
  });

  try {
    // Realiza la primera consulta SQL para la hoja 'dia'
    const [rowsDia] = await conexion.query(`
      SELECT 
        P.FechadPago, 
        OC.IdOrdenCompra, 
        AL.FechaInicialAlquiler, 
        OC.Total AS total_alquiler, 
        CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END AS ABONO, 
        CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END AS SALDO, 
        SUM(CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago) AS TotalAbonado, 
        (OC.Total - COALESCE(SUM(CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago), 0)) - COALESCE(SUM(CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago), 0) AS PendientePorPagar, 
        EP.Descripcion AS estadopago, 
        TP.Descripcion AS tipopago, 
        P.createdAt 
      FROM 
        pagos AS P 
        INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
        INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
        INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
        INNER JOIN alquilers AS AL ON (OC.IdAlquiler = AL.IdAlquiler);
    `);

    // Realiza la segunda consulta SQL para la hoja 'ABONOS'
    const [rowsAbonos] = await conexion.query(`
      SELECT 
        P.FechadPago, 
        OC.IdOrdenCompra, 
        OC.Total AS total_alquiler, 
        CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END AS ABONO, 
        CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END AS SALDO, 
        OC.Total - COALESCE(SUM(CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago), 0) - COALESCE(SUM(CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago), 0) AS PendientePorPagar 
      FROM 
        pagos AS P 
        INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
        INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
        INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
      WHERE 
        EP.IdEstadoPago IN (1, 2);
      `);

    // Realiza la tercera consulta SQL para obtener ABONO_TOTAL
    const [abonoTotal] = await conexion.query(`
      SELECT SUM(M.ABONO) AS ABONO_TOTAL
      FROM (
        SELECT 
          P.FechadPago, 
          OC.IdOrdenCompra, 
          CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END AS ABONO
        FROM pagos AS P 
          INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
          INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
          INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
        WHERE EP.IdEstadoPago = 1
      ) as M;
    `);

    // Realiza la tercera consulta SQL para obtener SALDO_TOTAL
    const [saldoTotal] = await conexion.query(`
      SELECT SUM(M.ABONO) AS SALDO_TOTAL
      FROM (
        SELECT 
          P.FechadPago, 
          OC.IdOrdenCompra, 
          CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END AS ABONO
        FROM pagos AS P 
          INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
          INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
          INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
        WHERE EP.IdEstadoPago = 2
      ) as M;
      `);


    // Realiza la tercera consulta SQL para la hoja 'SALDOS'
    const [rowsSaldos] = await conexion.query(`
      SELECT 
        P.FechadPago, 
        OC.IdOrdenCompra, 
        OC.Total AS total_alquiler, 
        CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END AS ABONO, 
        CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END AS SALDO 
      FROM pagos AS P 
      INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
      INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
      INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
      INNER JOIN alquilers AS AL ON (OC.IdAlquiler = AL.IdAlquiler);
    `);

    // Realiza la cuarta consulta SQL para la hoja 'GASTOS'
    const [rowsGastos] = await conexion.query(`
      SELECT 
        GE.createdAt,
        GE.Descripcion,
        GE.Monto,
        E.Nombre,
        E.Apellido
      FROM gastosempleados AS GE
      INNER JOIN empleados AS E ON GE.IdEmpleado = E.IdEmpleado;
    `);

    const response = {
      dia: rowsDia,
      abonos: rowsAbonos,
      saldos: rowsSaldos,
      gastos: rowsGastos,
    }

    res.status(200).json(response)

  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
  } finally {
    await conexion.end();
  }
}

const generarReporteSemanal = async (req, res) => {
  const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'cata',
    password: 'cata2047901*',
    database: 'Alquiler2',
  });

  try {
    // Realiza la primera consulta SQL para la hoja 'dia'
    const [rowsDia] = await conexion.query(`
    SELECT 
    P.FechadPago, 
    OC.IdOrdenCompra, 
    AL.FechaInicialAlquiler, 
    OC.Total AS total_alquiler, 
    CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END AS ABONO, 
    CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END AS SALDO, 
    SUM(CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago) AS TotalAbonado, 
    (OC.Total - COALESCE(SUM(CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago), 0)) - COALESCE(SUM(CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago), 0) AS PendientePorPagar, 
    EP.Descripcion AS estadopago, 
    TP.Descripcion AS tipopago, 
    P.createdAt 
FROM 
    pagos AS P 
    INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
    INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
    INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
    INNER JOIN alquilers AS AL ON (OC.IdAlquiler = AL.IdAlquiler)
WHERE 
    YEARWEEK(P.FechadPago) = YEARWEEK(CURDATE());


    `);

    // Realiza la segunda consulta SQL para la hoja 'ABONOS'
    const [rowsAbonos] = await conexion.query(`
SELECT 
  P.FechadPago, 
  OC.IdOrdenCompra, 
  OC.Total AS total_alquiler, 
  CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END AS ABONO, 
  CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END AS SALDO, 
  OC.Total - COALESCE(SUM(CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago), 0) - COALESCE(SUM(CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END) OVER (PARTITION BY OC.IdOrdenCompra ORDER BY P.FechadPago), 0) AS PendientePorPagar 
FROM 
  pagos AS P 
  INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
  INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
  INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
WHERE 
  EP.IdEstadoPago IN (1, 2)
  AND YEARWEEK(P.FechadPago) = YEARWEEK(CURDATE());

`);

    // Realiza la tercera consulta SQL para obtener ABONO_TOTAL
    const [abonoTotal] = await conexion.query(`
    SELECT SUM(M.ABONO) AS ABONO_TOTAL
    FROM (
      SELECT 
        P.FechadPago, 
        OC.IdOrdenCompra, 
        CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END AS ABONO
      FROM pagos AS P 
        INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
        INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
        INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
      WHERE EP.IdEstadoPago = 1
        AND YEARWEEK(P.FechadPago) = YEARWEEK(CURDATE())
    ) as M;
    
    `);

    // Realiza la tercera consulta SQL para obtener SALDO_TOTAL
    const [saldoTotal] = await conexion.query(`
SELECT SUM(M.ABONO) AS SALDO_TOTAL
FROM (
  SELECT 
    P.FechadPago, 
    OC.IdOrdenCompra, 
    CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END AS ABONO
  FROM pagos AS P 
    INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
    INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
    INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
  WHERE EP.IdEstadoPago = 2
   AND YEARWEEK(P.FechadPago) = YEARWEEK(CURDATE())
) as M;
`);


    // Realiza la tercera consulta SQL para la hoja 'SALDOS'
    const [rowsSaldos] = await conexion.query(`
      SELECT 
        P.FechadPago, 
        OC.IdOrdenCompra, 
        OC.Total AS total_alquiler, 
        CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END AS ABONO, 
        CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END AS SALDO 
      FROM pagos AS P 
      INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
      INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
      INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
      INNER JOIN alquilers AS AL ON (OC.IdAlquiler = AL.IdAlquiler)
      AND YEARWEEK(P.FechadPago) = YEARWEEK(CURDATE());
    `);

    // Realiza la cuarta consulta SQL para la hoja 'GASTOS'
    const [rowsGastos] = await conexion.query(`
    SELECT 
    GE.createdAt,
    GE.Descripcion,
    GE.Monto,
    E.Nombre,
    E.Apellido
  FROM gastosempleados AS GE
  INNER JOIN empleados AS E ON GE.IdEmpleado = E.IdEmpleado
  WHERE YEARWEEK(GE.createdAt) = YEARWEEK(CURDATE());
 
    `);

    // Realiza la cuarta consulta SQL para la hoja con tipos de 'CUENTAS SEMANA'
    const [rowsCuentasSemana] = await conexion.query(`
  SELECT
      pagos.IdTipoPago,
      tipopagos.Descripcion,
      SUM(CASE WHEN pagos.IdTipoPago = 1 THEN pagos.Valor ELSE 0 END) AS TotalPagosNequi,
      SUM(CASE WHEN pagos.IdTipoPago = 2 THEN pagos.Valor ELSE 0 END) AS TotalSumaDaviplata,
      SUM(CASE WHEN pagos.IdTipoPago = 3 THEN pagos.Valor ELSE 0 END) AS PagoTotalEfectivo,
      SUM(CASE WHEN pagos.IdTipoPago = 4 THEN pagos.Valor ELSE 0 END) AS PagoTotalTarjeta
  FROM pagos
  JOIN tipopagos ON pagos.IdTipoPago = tipopagos.IdTipoPago
  WHERE pagos.IdTipoPago IN (1, 2, 3, 4) AND YEARWEEK(pagos.FechadPago) = YEARWEEK(CURDATE())
  GROUP BY pagos.IdTipoPago, tipopagos.Descripcion;
`);

    const response = {
      dia: rowsDia,
      abonos: rowsAbonos,
      saldos: rowsSaldos,
      gastos: rowsGastos,
      cuentasSemana: rowsCuentasSemana,
      saldoTotal: saldoTotal,
      abonoTotal: abonoTotal,
    }

    res.status(200).json(response)
  }
  catch (error) {
    console.error('Error al ejecutar la consulta:', error);
  } finally {
    await conexion.end();
  }
}

module.exports = {
  generarReporte,
  generarReporteSemanal,
};