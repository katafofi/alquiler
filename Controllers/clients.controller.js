const Clients = require("../Models/clients.model");

const bufferToFile = require('../provider/bufferToFile');

const CreateClients = async (req, res) => {
  console.log("\n\nEl body es: ", req.body, "\n\n")
  const {
    Nombre,
    Apellido,
    Correo,
    Cedula,
    Direccion,
    Barrio,
    Telefono,
    ReferenciaPersonalNombre,
    ReferenciaPersonalTelefono,
    Fecha
  } = req.body;

  //organizar que se guarden son los dos que vienen desde el cb multer
  try {
    const ClientsCreate = await Clients.create({
      Nombre,
      Apellido,
      Cedula,
      Correo,
      Direccion,
      Barrio,
      Telefono,
      ReferenciaPersonalNombre,
      ReferenciaPersonalTelefono,
      Fecha
    });
    res.status(200).json(ClientsCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateClients = async (req, res) => {

  try {
    const { IdCliente } = req.params;

    const {
      Nombre,
      Apellido,
      Cedula,
      Correo,
      Direccion,
      Barrio,
      Telefono,
      ReferenciaPersonalNombre,
      ReferenciaPersonalTelefono,
      Fecha
    } = req.body;

    const [result] = await Clients.update(
      {
        Nombre,
        Apellido,
        Cedula,
        Correo,
        Direccion,
        Barrio,
        Telefono,
        ReferenciaPersonalNombre,
        ReferenciaPersonalTelefono,
        FotoDocumento,
        FotoServicioPublico,
        Fecha
      },
      {
        where: { IdCliente },
      }
    );
    if (result == 0) {
      res.status(404).json({ error: "Cliente no actualizada o encontrada" });
    } else {
      res.status(201).json({ message: "Cliente actualizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteClients = async (req, res) => {
  const { IdCliente } = req.params;
  const result = await Clients.destroy({ where: { IdCliente } })
  try {
    if (result == 0) {
      res.status(404).json({ error: "Cliente eliminado no encontrado por favor valide bien los datos ingresados" });
    } else {
      res.status(201).json({ message: "Cliente eliminado con exito" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleClients = async (req, res) => {
  const Idclientes = req.body
  const result = await Clients.destroy({ where: { IdCliente: Idclientes } })
  try {
    if (result == 0) {
      res.status(404).json({ error: "Clientes no eliminados o encontrados" });
    } else {
      res.status(201).json({ message: "Clientes eliminados" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneClientsById = async (req, res) => {
  const { IdCliente } = req.params;
  try {
    const result = await Clients.findOne({ where: { IdCliente } })

    if (result == 0) {
      res.status(404).json({ error: "Cliente  no encontrado" });
    } else {
      res.status(200).json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllClients = async (req, res) => {
  try {
    const result = await Clients.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateClients,
  UpdateClients,
  DeleteClients,
  DeleteMultipleClients,
  FindOneClientsById,
  FindAllClients
};

module.exports = all;