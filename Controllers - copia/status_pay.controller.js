const StatusPay = require("../Models/status_pay.model");

const CreateStatusPay= async (req, res) => {
  const {
    Descripcion
  } = req.body;

  try {
    const StatusPayCreate = await StatusPay.create({
      Descripcion
    });
    res.status(200).json(StatusPayCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdateStatusPay = async (req, res) => {
  const { IdEstadoPago } = req.params;

  const {
    Descripcion
  } = req.body;

  try {
    const [result] = await StatusPay.update(
      {
        Descripcion
      },
      {
        where: { IdEstadoPago },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "ESTADO PAGO no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "ESTADO PAGO actualizado"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteStatusPay= async (req, res) => {
  const { IdEstadoPago } = req.params;
  const result = await StatusPay.destroy({where: { IdEstadoPago} })
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

const DeleteMultipleStatusPay = async(req, res) => {
  const IdEstadoPagos = req.body
  const result = await StatusPay.destroy({where: { IdEstadoPago: IdEstadoPagos }})
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

const FindOneStatusPayById = async (req, res) => {
  const { IdEstadoPago } = req.params;
  try {
    const result = await StatusPay.findOne({ where: { IdEstadoPago} })
    
    if(result == 0){
        res.status(404).json({ error: "ESTADO PAGO no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllStatusPay = async (req, res) => {
  try {
    const result = await StatusPay.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreateStatusPay,
  UpdateStatusPay,
  DeleteStatusPay,
  DeleteMultipleStatusPay,
  FindOneStatusPayById ,
  FindAllStatusPay
};

module.exports = all;