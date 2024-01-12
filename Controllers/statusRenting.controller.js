const StatusRenting = require("../Models/statusRenting");

const CreateStatusRenting= async (req, res) => {
  const {
    Descripcion
  } = req.body;

  try {
    const StatusRentingCreate = await StatusRenting.create({
      Descripcion
    });
    res.status(200).json(StatusRentingCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateStatusRenting = async (req, res) => {
  const {IdEstadoAlquiler} = req.params;

  const {
    Descripcion
  } = req.body;

  try {
    const [result] = await StatusRenting.update(
      {
        Descripcion
      },
      {
        where: {IdEstadoAlquiler},
      }
    );
    if(result == 0){
        res.status(404).json({ error: "ESTADO NO ENCONTRADO"});
    }else{
        res.status(201).json({ message: "ESTADO ACTULÑIZADO"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteStatusRenting= async (req, res) => {
  const {IdEstadoAlquiler} = req.params;
  const result = await StatusRenting.destroy({where: { IdEstadoPago} })
  try {
    if(result == 0){
        res.status(404).json({ error: "ESTADO PAGO no encontrado por favor valide bien los datos ingresados"});
    }else{
        res.status(201).json({ message: "CESTADO PAGO eliminado con exito"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultipleStatusRenting = async(req, res) => {
  const IdEstadoPagos = req.body
  const result = await StatusRenting.destroy({where: { IdEstadoPago: IdEstadoPagos }})
  try {
    if(result == 0){
        res.status(404).json({ error: "ESTADO PAGO no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "ESTADO PAGO eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOneStatusRentingById = async (req, res) => {
  const {IdEstadoAlquiler} = req.params;
  try {
    const result = await StatusRenting.findOne({ where: { IdEstadoPago} })
    
    if(result == 0){
        res.status(404).json({ error: "ESTADO PAGO no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllStatusRenting = async (req, res) => {
  try {
    const result = await StatusRenting.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateStatusRenting,
  UpdateStatusRenting,
  DeleteStatusRenting,
  DeleteMultipleStatusRenting,
  FindOneStatusRentingById ,
  FindAllStatusRenting
};

module.exports = all;