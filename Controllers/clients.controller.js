const Clients = require("../Models/clients.model");

const bufferToFile = require('../provider/bufferToFile');

const CreateClients = async (req, res) => {
  const {
    Nombre,  
    Apellido,  
    Correo,
    Cedula,
    Direccion,
    Telefono,
    ReferenciaPersonalNombre,
    ReferenciaPersonalTelefono,
    Fecha
  } = req.body;

  const FotoDocumento = req.files && req.files['FotoDocumento'] ? req.files['FotoDocumento'][0].path : null;
  const FotoServicioPublico = req.files && req.files['FotoServicioPublico'] ? req.files['FotoServicioPublico'][0].path : null;
  
  console.log(FotoDocumento)
  console.log(FotoServicioPublico)
  //organizar que se guarden son los dos que vienen desde el cb multer
  try {
    const ClientsCreate = await  Clients.create({
     Nombre,  
    Apellido,
    Cedula,  
    Correo,
    Direccion,
    Telefono,
    ReferenciaPersonalNombre,
    ReferenciaPersonalTelefono,
    FotoDocumento,
    FotoServicioPublico,
    Fecha
    });
    res.status(200).json(ClientsCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateClients = async (req, res) => {
  const { IdCliente } = req.params;

  const {
    Nombre,  
    Apellido,
    Cedula,  
    Correo,
    Direccion,
    Telefono,
    ReferenciaPersonalNombre,
    ReferenciaPersonalTelefono,
    FotoDocumento,
    FotoServicioPublico,
    Fecha
  } = req.body;

  try {
    const [result] = await Clients.update(
      {
        Nombre,  
        Apellido,
        Cedula,  
        Correo,
        Direccion,
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
    if(result == 0){
        res.status(404).json({ error: "Cliente no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "Cliente actualizado"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteClients = async (req, res) => {
  const { IdCliente } = req.params;
  const result = await Clients.destroy({where: { IdCliente} })
  try {
    if(result == 0){
        res.status(404).json({ error: "Cliente eliminado no encontrado por favor valide bien los datos ingresados"});
    }else{
        res.status(201).json({ message: "Cliente eliminado con exito"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleClients = async(req, res) => {
  const Idclientes = req.body
  const result = await Clients.destroy({where: { IdCliente: Idclientes }})
  try {
    if(result == 0){
        res.status(404).json({ error: "Clientes no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "Clientes eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneClientsById = async (req, res) => {
  const { IdCliente } = req.params;
  try {
    const result = await Clients.findOne({ where: { IdCliente} })
    
    if(result == 0){
        res.status(404).json({ error: "Cliente  no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllClients = async (req, res) => {
  try {
    const result = await Clients.findAll();

    const clientsFilepath = await Promise.all(result.map(async (client) => {
       client.FotoDocumento = await bufferToFile(client.FotoDocumento, `FotoDocumento_${client.Cedula}_${client.Nombre}.pdf`)
       client.FotoServicioPublico = await bufferToFile(client.FotoServicioPublico, `FotoServicioPublico_${client.Cedula}_${client.Nombre}.pdf`)
       return client
    }))

    res.status(200).json(clientsFilepath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateClients,
  UpdateClients,
  DeleteClients,
  DeleteMultipleClients,
  FindOneClientsById ,
  FindAllClients
};

module.exports = all;