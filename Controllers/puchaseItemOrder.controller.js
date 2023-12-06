const PuchareItemOrder= require("../Models/puchase_item_order.model");

const CreatePuchareItemOrder = async (req, res) => {
  const {
    cantidad,
    IdOrdenCompra,
    IdArticulo
  } = req.body;

  try {
    const PuchareItemOrderCreate = await  PuchareItemOrder.create({
        cantidad,
        IdOrdenCompra,
        IdArticulo
    });
    res.status(200).json(PuchareItemOrderCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdatePuchareItemOrder = async (req, res) => {
  const { IdArticuloOrdenCompra  } = req.params;

  const {
    cantidad,
    IdOrdenCompra,
    IdArticulo
  } = req.body;

  try {
    const [result] = await PuchareItemOrder.update(
      {
        cantidad,
        IdOrdenCompra,
        IdArticulo
      },
      {
        where: { IdArticuloOrdenCompra },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "  el articulo orden compra no actualizada o encontrada"});
    }else{
        res.status(201).json({ message: "articulo orden compra actualizado"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });ttw
  }
};

const DeletePuchareItemOrder = async (req, res) => {
  const { IdArticuloOrdenCompra } = req.params;
  const result = await PuchareItemOrder.destroy({where: {  IdArticuloOrdenCompra} })
  try {
    if(result == 0){
        res.status(404).json({ error: "articulo orden compra eliminado no encontrado por favor valide bien los datos ingresados"});
    }else{
        res.status(201).json({ message: "articulo orden compra eliminado con exito"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultiPuchareItemOrder = async(req, res) => {
  const IdArticuloOrdenCompras = req.body
  const result = await PuchareItemOrder.destroy({where: { IdArticuloOrdenCompra : IdArticuloOrdenCompras }})
  try {
    if(result == 0){
        res.status(404).json({ error: "articulo orden compra no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "articulo orden compra eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOnePuchareItemOrderById = async (req, res) => {
  const { IdOrdenCompra } = req.params;
  try {
    const result = await PuchareItemOrder.findAll({ where: { IdOrdenCompra } })
    
    if(result == 0){
        res.status(404).json({ error: "articulo orden compra no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllPuchareItemOrder = async (req, res) => {
  try {
    const result = await PuchareItemOrder.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreatePuchareItemOrder,
  UpdatePuchareItemOrder,
  DeletePuchareItemOrder,
  DeleteMultiPuchareItemOrder,
  FindOnePuchareItemOrderById ,
  FindAllPuchareItemOrder
};

module.exports = all;