const mysql = require('mysql2/promise');

async function getEntregas(req, res) {
    console.log("🔥 Controller ENTREGAS cargado");
  let conexion;

  try {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({
        error: 'Debe enviar fechaInicio y fechaFin'
      });
    }

    conexion = await mysql.createConnection({
      host: 'localhost',
      user: 'cata',
      password: 'TuNuevaClaveSegura123!',
      database: 'Alquiler2',
    });

    const [entregas] = await conexion.execute(`
      SELECT 
        a.FechaInicialAlquiler,
        a.IdCliente,
        c.Nombre,
        c.Apellido,
        o.IdOrdenCompra,
        ar.Descripcion AS ArticuloDescripcion
      FROM alquilers a
      LEFT JOIN clientes c ON a.IdCliente = c.IdCliente
      LEFT JOIN ordencompras o ON a.IdAlquiler = o.IdAlquiler
      LEFT JOIN articulosordencompras ao ON o.IdOrdenCompra = ao.IdOrdenCompra
      LEFT JOIN articulos ar ON ao.IdArticulo = ar.IdArticulo
      WHERE DATE(a.FechaInicialAlquiler) BETWEEN ? AND ?
      ORDER BY a.FechaInicialAlquiler DESC
    `, [fechaInicio, fechaFin]);

    res.status(200).json({
      rango: {
        fechaInicio,
        fechaFin
      },
      total: entregas.length,
      entregas
    });

  } catch (error) {
    console.error('Error en getEntregas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });

  } finally {
    if (conexion) await conexion.end();
  }

}

module.exports = { getEntregas };
