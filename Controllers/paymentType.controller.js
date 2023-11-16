const PaymentType = require("../Models/payment_type.model");

const CreatePaymentType= async (req, res) => {
  const {
    Descripcion

  } = req.body;

  try {
    const PaymentTypeCreate = await PaymentType.create({
        Descripcion

    });
    res.status(200).json(PaymentTypeCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdatePaymentType = async (req, res) => {
  const { IdTipoPago } = req.params;

  const {
    Descripcion

  } = req.body;

  try {
    const [result] = await PaymentType.update(
      {
        Descripcion
      
      },
      {
        where: { IdTipoPago },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "Tipo de pago no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "Tipo de pago actualizado"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeletePaymentType = async (req, res) => {
  const { IdTipoPago } = req.params;
  const result = await PaymentType.destroy({where: { IdTipoPago} })
  try {
    if(result == 0){
        res.status(404).json({ error: "Tipo de pago eliminado no encontrado por favor valide bien los datos ingresados"});
    }else{
        res.status(201).json({ message: "Tipo de pago eliminado con exito"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultiplePaymentType = async(req, res) => {
  const IdTipoPagos = req.body
  const result = await PaymentType.destroy({where: { IdTipoPago: IdTipoPagos }})
  try {
    if(result == 0){
        res.status(404).json({ error: "Tipo de pago no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "Tipo de pago eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOnePaymentTypeById = async (req, res) => {
  const { IdTipoPago } = req.params;
  try {
    const result = await PaymentType.findOne({ where: { IdTipoPago} })
    
    if(result == 0){
        res.status(404).json({ error: "Tipo de pago no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllPaymentType = async (req, res) => {
  try {
    const result = await PaymentType.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {

  CreatePaymentType,
  UpdatePaymentType,
  DeletePaymentType,
  DeleteMultiplePaymentType,
  FindOnePaymentTypeById ,
  FindAllPaymentType
  
};

module.exports = all;