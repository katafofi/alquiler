const PuchaseOrder = require("../Models/purchase_order.model");
const PDFDocument = require('pdfkit');
const fs = require('fs')

const handleGetByIdEmploye = async (id) => {
  try {
    const form = "employe";
    const URL = "http://localhost:";
    const PORT = "3003";
    const response = await fetch(`${URL}${PORT}/${form}/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};


const handleGetByIdAlquiler = async (id) => {
  try {
    const form = "renting";
    const URL = "http://localhost:";
    const PORT = "3003";
    const response = await fetch(`${URL}${PORT}/${form}/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};


const handleGetByIdStore = async (id) => {
  try {
    const form = "Store";
    const URL = "http://localhost:";
    const PORT = "3003";
    const response = await fetch(`${URL}${PORT}/${form}/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};

const handleGetByIdClient = async (id) => {
  try {
    const form = "Clients";
    const URL = "http://localhost:";
    const PORT = "3003";
    const response = await fetch(`${URL}${PORT}/${form}/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};


const handleGetByIdPuchaseItemOrder = async (id) => {
  try {
    const form = "PuchaseItemOrder";
    const URL = "http://localhost:";
    const PORT = "3003";
    const response = await fetch(`${URL}${PORT}/${form}/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};


const handleGetByIdItems = async (id) => {
  try {
    const form = "item";
    const URL = "http://localhost:";
    const PORT = "3003";
    const response = await fetch(`${URL}${PORT}/${form}/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};

const handleGetByIdPuchaseOrder = async (id) => {
  try {
    const form = "PuchaseOrder";
    const URL = "http://localhost:";
    const PORT = "3003";
    const response = await fetch(`${URL}${PORT}/${form}/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};

const exportPdf = async (result, responseEmploye, responseRenting, responseClient, responseStore, responsePuchaseOrder, responsePuchaseItemOrder) => {
   console.log(result)
   const doc = new PDFDocument();
    
   const outputPath = './Invoice/out2.pdf';
   const stream = fs.createWriteStream(outputPath);
   doc.pipe(stream);

   const opcionesFormato = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short', timeZone: 'UTC' };

   doc.fontSize(18);

    doc.text(`Fecha compra: ${result.FechaCompra}`)
    .moveDown(0.5);
    doc.text(`Id Orden: ${result.IdOrdenCompra}`)
    .moveDown(0.5);
    doc.text(`Empleado: ${responseEmploye.message.Nombre} ${responseEmploye.message.Apellido}`)
    .moveDown(0.5);
    doc.text(`
        Fecha Inicial: ${new Date(responseRenting.message.FechaInicialAlquiler).toLocaleDateString('es-ES', opcionesFormato)}  
        Fecha final: ${new Date(responseRenting.message.FechaFinlAlquiler).toLocaleDateString('es-ES', opcionesFormato)} 
        Id alquiler es: ${result.IdAlquiler}
    `)
    .moveDown(0.5);
    doc.text(`
        Tienda: ${responseStore.message.Nit}  
        Nombre: ${responseStore.message.Nombre} 
        Direccion: ${responseStore.message.Direccion} 
        Telefono: ${responseStore.message.Telefono} 
        Correo: ${responseStore.message.Correo}
    `)
    .moveDown(0.5);
    doc.text(`
        IdCliente: ${responseClient.message.IdCliente}
        Nombre: ${responseClient.message.Nombre}
        Apellido: ${responseClient.message.Apellido}
        Cedula: ${responseClient.message.Cedula}
        Correo: ${responseClient.message.Correo}
        Direccion: ${responseClient.message.Direccion}
        Telefono: ${responseClient.message.Telefono}
        ReferenciaPersonalNombre: ${responseClient.message.ReferenciaPersonalNombre}
        ReferenciaPersonalTelefono: ${responseClient.message.ReferenciaPersonalTelefono}
        Fecha: ${responseClient.message.Fecha}
    `).moveDown(0,5)

    let total = 0

    function formatprecing(number) {
      return number.toLocaleString('co-ES');
    }

    doc.text('Cantidad | Id Articulo | Descripcion | Precio | Subtotal').moveDown(0, 2);

    await Promise.all(responsePuchaseItemOrder.message.map(async (name, key) => {
      try {
        const ArticulosDetails = await handleGetByIdItems(name.IdArticulo);
        const subtotal = name.Cantidad * ArticulosDetails.message.PrecioArticulo
        total += subtotal
            doc.text(`${name.Cantidad} | ${ArticulosDetails.message.IdArticulo} | ${ArticulosDetails.message.Descripcion} | ${formatprecing(Math.round(parseFloat(ArticulosDetails.message.PrecioArticulo)))} | ${formatprecing(Math.round(parseFloat(subtotal)))}`)
      } catch (error) {
        console.error(`Error for ${name.IdArticulo}:`, error);
      }
    }));

    doc.text(`Total: $ ${formatprecing(Math.round(parseFloat(total)))}`).moveDown(0, 5);

    doc.text(`
          Politicas: colocarlas...


        `).moveDown(0, 5);

   doc.end();
   stream.on('finish', () => {
     console.log(`PDF created at: ${outputPath}`);
   });
   
   stream.on('error', (err) => {
     console.error(`Error creating PDF: ${err}`);
   });
}

const generateInvoice = async (req, res) => {
  const { id } = req.body
  const result = await PuchaseOrder.findOne({ where: { IdOrdenCompra: id } });
  try {
    if (result === 0) {
      res.status(404).json({ error: "Orden de compra no eliminada o encontrada" });
    } else {
      const responseEmploye = await handleGetByIdEmploye(result.IdEmpleado)      
      const responseRenting = await handleGetByIdAlquiler(result.IdAlquiler)      
      const responseClient = await handleGetByIdClient(responseRenting?.message?.IdCliente)
      const responseStore = await handleGetByIdStore(responseRenting?.message?.IdTienda)
      const responsePuchaseOrder = await handleGetByIdPuchaseOrder(responseRenting?.message?.IdAlquiler)
      const responsePuchaseItemOrder = await handleGetByIdPuchaseItemOrder(responsePuchaseOrder?.message?.IdOrdenCompra)
      
      exportPdf(result, responseEmploye, responseRenting, responseClient, responseStore, responsePuchaseOrder, responsePuchaseItemOrder)
      res.status(200).json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createPurchaseOrder = async (req, res) => {
  const { FechaCompra, IdAlquiler, IdEmpleado, Total } = req.body;

  try {
    const purchaseOrderCreate = await PuchaseOrder.create({
      FechaCompra,
      IdAlquiler,
      IdEmpleado,
      Total,
    });
    res.status(201).json(purchaseOrderCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePurchaseOrder = async (req, res) => {
  const { IdOrdenCompra } = req.params;

  const { FechaCompra, IdAlquiler, IdEmpleado, Total } = req.body;

  try {
    const [result] = await PuchaseOrder.update(
      {
        FechaCompra,
        IdAlquiler,
        IdEmpleado,
        Total
      },
      {
        where: { IdOrdenCompra },
      }
    );
    if (result === 0) {
      res.status(404).json({ error: "Orden de compra no actualizada o encontrada" });
    } else {
      res.status(200).json({ message: "Orden de compra actualizada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePurchaseOrder = async (req, res) => {
  const { IdOrdenCompra } = req.params;
  const result = await PuchaseOrder.destroy({ where: { IdOrdenCompra } });
  try {
    if (result === 0) {
      res.status(404).json({ error: "Orden de compra no eliminada o encontrada" });
    } else {
      res.status(200).json({ message: "Orden de compra eliminada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMultiplePurchaseOrder = async (req, res) => {
  const IdOrdenCompras = req.body;
  const result = await PuchaseOrder.destroy({ where: { IdOrdenCompra: IdOrdenCompras } });
  try {
    if (result === 0) {
      res.status(404).json({ error: "Orden de compra no eliminada o encontrada" });
    } else {
      res.status(200).json({ message: "Orden de compra eliminada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findOnePurchaseOrderById = async (req, res) => {
  const { IdOrdenCompra } = req.params;
  try {
    const result = await PuchaseOrder.findOne({ where: { IdOrdenCompra } });

    if (!result) {
      res.status(404).json({ error: "Orden de compra no encontrada" });
    } else {
      res.status(200).json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllPurchaseOrder = async (req, res) => {
  try {
    const result = await PuchaseOrder.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  generateInvoice,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  deleteMultiplePurchaseOrder,
  findOnePurchaseOrderById,
  findAllPurchaseOrder,
};

module.exports = all;