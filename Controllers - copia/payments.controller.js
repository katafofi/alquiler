const exportToExcel = require("../Invoice/reportes_prueba");
const Payments = require("../Models/payments.models");

const CreatePayments = async (req, res) => {
  const { FechadPago, Valor, IdEstadoPago, IdTipoPago, IdOrdenCompra } = req.body;

  try {
    const PaymentsCreate = await Payments.create({
      FechadPago,
      Valor,
      IdEstadoPago,
      IdTipoPago,
      IdOrdenCompra,
    });
    res.status(200).json(PaymentsCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdatePayments = async (req, res) => {
  const { IdPago } = req.params;

  const { FechadPago, Valor, IdEstadoPago, IdTipoPago, IdOrdenCompra } = req.body;

  try {
    const [result] = await Payments.update(
      {
        FechadPago,
        Valor,
        IdEstadoPago,
        IdTipoPago,
        IdOrdenCompra,
      },
      {
        where: { IdPago },
      }
    );
    if (result == 0) {
      res.status(404).json({ error: "pago no actualizado o encontrado" });
    } else {
      res.status(201).json({ message: "pago actualizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeletePayments = async (req, res) => {
  const { IdPago } = req.params;
  const result = await Payments.destroy({ where: { IdPago } });
  try {
    if (result == 0) {
      res.status(404).json({ error: "pago eliminado o encontrado" });
    } else {
      res.status(201).json({ message: "pagos eliminados" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultiplePayments = async (req, res) => {
  const IdPagos = req.body;
  const result = await Payments.destroy({ where: { IdPago : IdPagos } });
  try {
    if (result == 0) {
      res.status(404).json({ error: "psgos  no eliminados o encontrados" });
    } else {
      res.status(201).json({ message: "pagos eliminados" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOnePaymentsById = async (req, res) => {
  const { IdPago } = req.params;
  try {
    const result = await Payments.findOne({ where: { IdPago } });

    if (result == 0) {
      res.status(404).json({ error: "pagos  no encontrado" });
    } else {
      res.status(200).json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllPayments = async (req, res) => {
  try {
    const result = await Payments.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllPaymentsExport = async (req, res) => {
  try {
    exportToExcel()
    res.status(200).json('exportado');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreatePayments,
  UpdatePayments,
  DeletePayments,
  DeleteMultiplePayments,
  FindOnePaymentsById,
  FindAllPayments,
  FindAllPaymentsExport
};

module.exports = all;
