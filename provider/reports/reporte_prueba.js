const mysql = require('mysql2/promise');
const XLSX = require('xlsx');


async function generarReporte() {
  // Configuración de la conexión a la base de datos
  const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'cata',
    password: 'cata2047901*',
    database: 'Alquiler2',
  });

  function formatearFecha(fecha) {
    const opcionesFecha = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaFormateada = new Intl.DateTimeFormat('es-CO', opcionesFecha).format(fecha);
    return `${fechaFormateada} `;
  }

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



    // Crea un libro de Excel
    const libro = XLSX.utils.book_new();

    const hojaDia = XLSX.utils.json_to_sheet(rowsDia.map(row => ({
      ...row,
      FechadPago: formatearFecha(row.FechadPago),
      createdAt: formatearFecha(row.createdAt),
    })));
    XLSX.utils.book_append_sheet(libro, hojaDia, 'DIA');

    // Agregar el resultado de SALDO_TOTAL a la hoja de ABONOS
    const hojaAbonos = XLSX.utils.json_to_sheet([
      ...rowsAbonos.map(row => ({
        ...row,
        FechadPago: formatearFecha(row.FechadPago),
      })),
      { ABONO_TOTAL: abonoTotal[0].ABONO_TOTAL, SALDO_TOTAL: saldoTotal[0].SALDO_TOTAL }, // Agrega SALDO_TOTAL como una nueva fila
    ]);
    XLSX.utils.book_append_sheet(libro, hojaAbonos, 'ABONOS');



    // Crea una hoja de Excel con los resultados de 'SALDOS'
    const hojaSaldos = XLSX.utils.json_to_sheet(rowsSaldos.map(row => ({
      ...row,
      FechadPago: formatearFecha(row.FechadPago),
    })));
    XLSX.utils.book_append_sheet(libro, hojaSaldos, 'SALDOS');

    // Crea una hoja de Excel con los resultados de 'GASTOS'
    const hojaGastos = XLSX.utils.json_to_sheet(rowsGastos.map(row => ({
      ...row,
      createdAt: formatearFecha(row.createdAt),
    })));
    XLSX.utils.book_append_sheet(libro, hojaGastos, 'GASTOS');


    // Crear una nueva hoja 'CUENTAS SEMANA' con el resultado de SALDO_TOTAL y ABONO_TOTAL
    const hojaCuentasSemana = XLSX.utils.json_to_sheet([
      { SALDO_TOTAL: saldoTotal[0].SALDO_TOTAL, ABONO_TOTAL: abonoTotal[0].ABONO_TOTAL }, // Agrega SALDO_TOTAL y ABONO_TOTAL como nuevas columnas
    ]);
    const nombreHojaCuentasSemana = 'CUENTAS_SEMANA'; // Cambia el nombre de la hoja aquí
    XLSX.utils.book_append_sheet(libro, hojaCuentasSemana, nombreHojaCuentasSemana);


    // Agrega la hoja 'CUENTAS SEMANA' al libro
    XLSX.utils.book_append_sheet(libro, hojaCuentasSemana, 'CUENTAS SEMANA');

    // Obtén la fecha actual para nombrar el libro de Excel
    const fechaActual = new Date().toLocaleDateString('es-CO').replace(/\//g, '-');

    // Guarda el libro de Excel
    XLSX.writeFile(libro, `reporte_${fechaActual}.xlsx`);

    console.log('El archivo Excel ha sido creado exitosamente.');




    console.log('El archivo Excel ha sido creado exitosamente.');
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
  } finally {
    await conexion.end();
  }
}

// Llama a la función para generar el reporte
generarReporte();
