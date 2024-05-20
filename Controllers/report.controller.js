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
    // Realiza la primera consulta SQL para la hoja 'dia' esta se usa en la vista de front
    await conexion.query('SET lc_time_names = "es_ES";');

    const [rowsDia] = await conexion.query(`
      SELECT 
    DATE_FORMAT(P.FechadPago, '%d %b %Y') AS FECHA,
    OC.IdOrdenCompra AS ORDEN,
    DATE_FORMAT(AL.FechaInicialAlquiler, '%d %b %Y') AS FECHA_SALIDA,
    FORMAT(OC.Total, 2) AS VALOR_FACTURA,
    FORMAT(CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END, 2) AS ABONO, 
    FORMAT(CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END, 2) AS SALDO, 
    TP.Descripcion AS TIPOPAGO, 
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
    
       

  
    

    const response = {
      dia: rowsDia,  
     
      
    }

    res.status(200).json(response)

  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
  } finally {
    await conexion.end();
  }
}

const generarReporteSemanal = async (req, res) => {
  const { initialDate, finalDate } = req.body
  // initialDate:2024-01-01, finalDate:2024-01-22
  const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'cata',
    password: 'cata2047901*',
    database: 'Alquiler2',
  });

  try {
    // Realiza la primera consulta SQL para la hoja 'dia'
    await conexion.query('SET lc_time_names = "es_ES";');
     const [rowsDia] = await conexion.query(`
    
     SELECT 
     DATE_FORMAT(P.FechadPago, '%d %b %Y') AS FECHA,
     OC.IdOrdenCompra AS ORDEN,
     DATE_FORMAT(AL.FechaInicialAlquiler, '%d %b %Y') AS FECHA_SALIDA,
     FORMAT(OC.Total, 2) AS VALOR_FACTURA,
     FORMAT(CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END, 2) AS ABONO, 
     FORMAT(CASE WHEN EP.IdEstadoPago = 2 THEN P.Valor ELSE 0 END, 2) AS SALDO, 
     TP.Descripcion AS TIPOPAGO, 
     
     P.nombre AS NOMBRE
 FROM 
     pagos AS P 
     INNER JOIN tipopagos AS TP ON P.IdTipoPago = TP.IdTipoPago
     INNER JOIN estadopagos AS EP ON P.IdEstadoPago = EP.IdEstadoPago
     INNER JOIN ordencompras AS OC ON P.IdOrdenCompra = OC.IdOrdenCompra
     INNER JOIN alquilers AS AL ON OC.IdAlquiler = AL.IdAlquiler
 WHERE 
     P.FechadPago >= '${initialDate}'
     AND P.FechadPago <= '${finalDate}'
 ORDER BY ORDEN ASC;
         `);

    //  hoja abonos OK    // Realiza la segunda consulta SQL para la hoja 'ABONOS'
    await conexion.query('SET lc_time_names = "es_ES";');

         const [rowsAbonos] = await conexion.query(`
         SELECT 
         OC.IdOrdenCompra AS ORDEN,
         FORMAT(P.Valor, '#,##0') AS ABONO
     FROM 
         pagos AS P 
         INNER JOIN estadopagos AS EP ON P.IdEstadoPago = EP.IdEstadoPago 
         INNER JOIN ordencompras AS OC ON P.IdOrdenCompra = OC.IdOrdenCompra 
     WHERE 
         P.FechadPago >= '${initialDate}'
         AND P.FechadPago <= '${finalDate}'
         AND EP.IdEstadoPago = 1
     ORDER BY 
         OC.IdOrdenCompra ASC;
     
     


  `);

    //     // Realiza la tercera consulta SQL para obtener ABONO_TOTAL
        const [abonoTotal] = await conexion.query(`
    SELECT REPLACE(
      COALESCE(FORMAT(SUM(M.ABONO), 0), 0),
      ',',
      '.'
  ) AS ABONO_TOTAL
  FROM (
      SELECT 
          P.FechadPago, 
          OC.IdOrdenCompra, 
          CASE WHEN EP.IdEstadoPago = 1 THEN P.Valor ELSE 0 END AS ABONO
      FROM 
          pagos AS P 
          INNER JOIN tipopagos AS TP ON (P.IdTipoPago = TP.IdTipoPago) 
          INNER JOIN estadopagos AS EP ON (P.IdEstadoPago = EP.IdEstadoPago) 
          INNER JOIN ordencompras AS OC ON (P.IdOrdenCompra = OC.IdOrdenCompra) 
      WHERE 
          EP.IdEstadoPago = 1
          AND P.FechadPago >= '${initialDate}'
          AND P.FechadPago <= '${finalDate}'
  ) AS M; 


     `);
    // REALIZA LA SUMA ENTRE SALDO TOTAL + ABONO TOTAL DE LA SEMANA 
const [granTotal] = await conexion.query(`
SELECT FORMAT(SUM(Valor), 0) AS SUMA_GENERAL
FROM pagos
WHERE 
    FechadPago >= '${initialDate}'
    AND FechadPago <= '${finalDate}';
`);

// REALIZAR LA RESTA ENTRE SUMA GENERAL y GASTOS TOTAL
const [diferenciaTotal] = await conexion.query(`
  SELECT 
    FORMAT(
      (SELECT SUM(Valor) FROM pagos 
       WHERE FechadPago >= '${initialDate}' AND FechadPago <= '${finalDate}' AND IdTipoPago = 3)
       -
      COALESCE(
          (SELECT SUM(GE.Monto) FROM gastosempleados AS GE
           INNER JOIN empleados AS E ON GE.IdEmpleado = E.IdEmpleado
           WHERE GE.Fecha >= '${initialDate}' AND GE.Fecha <= '${finalDate}'
          ), 
          0
      ), 
      0
  ) AS TOTAL;
`);


//REALIZA SUMA DE GASTOS TOTAL DE LA SEMANA 
const [gastoTotal] = await conexion.query(`
SELECT FORMAT(
    COALESCE(SUM(GE.Monto), 0), 0
) AS TOTAL_GASTOS_SEMANA
FROM gastosempleados AS GE
INNER JOIN empleados AS E ON GE.IdEmpleado = E.IdEmpleado
WHERE 
    GE.Fecha >= '${initialDate}'  
    AND GE.Fecha <= '${finalDate}';  
`);

// Luego puedes utilizar estas variables formateadas donde las necesites.


    //     // Realiza la tercera consulta SQL para la hoja 'SALDOS'
    //     // Establecer configuración de formato de fecha en español
        await conexion.query('SET lc_time_names = "es_ES";');

    //  ok si    // Realizar la tercera consulta SQL para la hoja 'SALDOS'
    const [rowsSaldos] = await conexion.query(`
    SELECT 
    OC.IdOrdenCompra AS ORDEN,
    FORMAT(P.Valor, '#,##0') AS SALDO
FROM 
    pagos AS P
    INNER JOIN estadopagos AS EP ON P.IdEstadoPago = EP.IdEstadoPago
    INNER JOIN ordencompras AS OC ON P.IdOrdenCompra = OC.IdOrdenCompra
    INNER JOIN alquilers AS AL ON OC.IdAlquiler = AL.IdAlquiler
WHERE 
    P.FechadPago >= '${initialDate}'
    AND P.FechadPago <= '${finalDate}'
    AND EP.IdEstadoPago = 2
ORDER BY 
    OC.IdOrdenCompra ASC;
  `);
  

    //     // Realiza la cuarta consulta SQL para la hoja 'GASTOS_ SEMANA'
        await conexion.query('SET lc_time_names = "es_ES";');
      const [rowsGastos] = await conexion.query(`
      SELECT 
    DATE_FORMAT(GE.Fecha, '%d %b %Y') AS FECHA,
    UPPER(GE.Descripcion) AS DESCRIPCION,
    FORMAT(GE.Monto, 0) AS MONTO,
    UPPER(E.Nombre) AS NOMBRE,
    UPPER(E.Apellido) AS APELLIDO
FROM 
    gastosempleados AS GE
    INNER JOIN empleados AS E ON GE.IdEmpleado = E.IdEmpleado
WHERE 
    GE.Fecha >= '${initialDate}'
    AND GE.Fecha <= '${finalDate}';
     `);

    //     // Realiza la cuarta consulta SQL para la hoja 'GASTOS'
      await conexion.query('SET lc_time_names = "es_ES";');
        const [rowsGastostotal] = await conexion.query(`
    SELECT 
    DATE_FORMAT(GE.Fecha, '%d %b %Y') AS FECHA,
    UPPER(GE.Descripcion) AS DESCRIPCION,
    FORMAT(GE.Monto, 0) AS MONTO,
    UPPER(E.Nombre) AS NOMBRE,
    UPPER(E.Apellido) AS APELLIDO
FROM 
    gastosempleados AS GE
    INNER JOIN empleados AS E ON GE.IdEmpleado = E.IdEmpleado
WHERE 
    GE.Fecha >= '${initialDate}'
    AND GE.Fecha <= '${finalDate}';
         `);
    //     // Realiza la cuarta consulta SQL para la hoja con tipos de 'CUENTAS SEMANA'
        const [rowsCuentasSemana] = await conexion.query(`
    SELECT
    UPPER(tipopagos.Descripcion) AS DESCRIPCION,
    FORMAT(SUM(CASE WHEN pagos.IdTipoPago = 1 THEN pagos.Valor ELSE 0 END), 0) AS NEQUI,
    FORMAT(SUM(CASE WHEN pagos.IdTipoPago = 2 THEN pagos.Valor ELSE 0 END), 0) AS DAVIPLATA,
    FORMAT(SUM(CASE WHEN pagos.IdTipoPago = 3 THEN pagos.Valor ELSE 0 END), 0) AS EFECTIVO,
    FORMAT(SUM(CASE WHEN pagos.IdTipoPago = 4 THEN pagos.Valor ELSE 0 END), 0) AS TARGETA
FROM 
    pagos
    JOIN tipopagos ON pagos.IdTipoPago = tipopagos.IdTipoPago
WHERE 
    pagos.IdTipoPago IN (1, 2, 3, 4) 
    AND pagos.FechadPago >= '${initialDate}'
    AND pagos.FechadPago <= '${finalDate}'
GROUP BY 
    pagos.IdTipoPago, tipopagos.Descripcion;


     `);

        // Realiza la tercera consulta SQL para obtener SALDO_TOTAL
    const [saldoTotal] = await conexion.query(`
    SELECT FORMAT(
      SUM(M.ABONO), 0
  ) AS SALDO_TOTAL
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
          AND P.FechadPago >= '${initialDate}'
          AND P.FechadPago <= '${finalDate}'
  ) as M;
  
    
    `);
    const [salidas] = await conexion.query(`
    SELECT 
    DATE_FORMAT(a.FechaInicialAlquiler, '%d de %M de %Y') AS fechaSalida,
    ROW_NUMBER() OVER () AS numero,
    o.IdOrdenCompra
FROM 
    alquilers a
LEFT JOIN 
    ordencompras o ON a.IdAlquiler = o.IdAlquiler
WHERE 
    a.FechaInicialAlquiler >= '${initialDate}' 
    AND a.FechaInicialAlquiler <= '${finalDate}'
    AND o.IdOrdenCompra IS NOT NULL -- Excluir filas con IdOrdenCompra NULL
ORDER BY 
    numero ASC;


    `);

    const response = {
       dia: rowsDia,
       abonos: rowsAbonos,
       saldos: rowsSaldos,
       gastos: rowsGastos,
       rowsGastostotal: rowsGastostotal,
       cuentasSemana: rowsCuentasSemana,
      saldoTotal: saldoTotal,
       abonoTotal: abonoTotal,
       granTotal: granTotal,
       gastoTotal: gastoTotal,
      diferenciaTotal: diferenciaTotal,
      salidas: salidas
    };

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