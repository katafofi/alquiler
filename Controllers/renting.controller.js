const Renting = require("../Models/renting.model");

const CreateRenting = async (req, res) => {
  const {
    FechaInicialAlquiler,
    FechaFinlAlquiler,
    IdTienda,
    IdCliente,
    IdEstadoAlquiler,
  } = req.body;

  try {
    const RentingCreate = await Renting.create({
      FechaInicialAlquiler,
      FechaFinlAlquiler,
      IdTienda,
      IdCliente,
      IdEstadoAlquiler,
    });
    res.status(200).json(RentingCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateRenting = async (req, res) => {
  const { IdAlquiler } = req.params;

  const {
    FechaInicialAlquiler,
    FechaFinlAlquiler,
    IdTienda,
    IdCliente,
    IdEstadoAlquiler,

  } = req.body;

  try {
    const [result] = await Renting.update(
      {
        FechaInicialAlquiler,
        FechaFinlAlquiler,
        IdTienda,
        IdCliente,
        IdEstadoAlquiler
      },
      {
        where: { IdAlquiler },
      }
    );
    if (result == 0) {
      res.status(404).json({ error: "Alquiler no actualizada o encontrada" });
    } else {
      res.status(201).json({ message: "Alquiler  actualizada", result: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteRenting = async (req, res) => {
  const { IdAlquiler } = req.params;
  const result = await Renting.destroy({ where: { IdAlquiler } })
  try {
    if (result == 0) {
      res.status(404).json({ error: "Alquiler  eliminado o encontrado" });
    } else {
      res.status(201).json({ message: "Alquiler  eliminada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleRenting = async (req, res) => {
  const IdAlquileres = req.body
  const result = await Renting.destroy({ where: { IdAlquiler: IdAlquileres } })
  try {
    if (result == 0) {
      res.status(404).json({ error: "Alquiler  no eliminados o encontrados" });
    } else {
      res.status(201).json({ message: "Alquiler  eliminados" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneRentingById = async (req, res) => {
  const { IdAlquiler } = req.params;
  try {
    const result = await Renting.findOne({ where: { IdAlquiler } })

    if (result == 0) {
      res.status(404).json({ error: "Alquiler  no encontrado" });
    } else {
      res.status(200).json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllRenting = async (req, res) => {
  try {
    const result = await Renting.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateRenting,
  UpdateRenting,
  DeleteRenting,
  DeleteMultipleRenting,
  FindOneRentingById,
  FindAllRenting
};

module.exports = all;