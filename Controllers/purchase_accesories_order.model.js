const PuchaseAccesoriesOrder = require("../Models/purchase_accesories_order.model");

const CreatePuchaseAccesoriesOrder = async (req, res) => {
  const {
    cantidad,
    IdOrdenCompra,
    IdAccesorio	    
  } = req.body;

  try {
    const PuchaseAccesoriesOrderCreate = await  PuchaseAccesoriesOrder.create({
        cantidad,
    IdOrdenCompra,
    IdAccesorio	 
    });
    res.status(200).json(PuchaseAccesoriesOrderCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdatePuchaseAccesoriesOrder= async (req, res) => {
  const {  IdAccesorioOrdenCompra } = req.params;

  const {
    cantidad,
    IdOrdenCompra,
    IdAccesorio	 
  } = req.body;

  try {
    const [result] = await PuchaseAccesoriesOrder.update(
      {
        cantidad,
        IdOrdenCompra,
        IdAccesorio	 
      },
      {
        where: {  IdAccesorioOrdenCompra },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "accesorio orden compra no actualizado o encontrado"});
    }else{
        res.status(201).json({ message: "accesorio orden compra"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeletePuchaseAccesoriesOrder = async (req, res) => {
  const {  IdAccesorioOrdenCompra } = req.params;
  
  const result = await PuchaseAccesoriesOrder.destroy({where: {  IdAccesorioOrdenCompra } })
  try {
    if(result == 0){
        res.status(404).json({ error: "accesorio orden compra eliminado no encontrado"});
    }else{
        res.status(201).json({ message: "iaccesorio orden compra"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultiplePuchaseAccesoriesOrder = async(req, res) => {
  const  IdAccesorioOrdenCompras = req.body
  const result = await PuchaseAccesoriesOrder.destroy({where: {  IdAccesorioOrdenCompra :  IdAccesorioOrdenCompras }})
  try {
    if(result == 0){
        res.status(404).json({ error: "accesorio orden compra no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "iaccesorio orden compra eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOnePuchaseAccesoriesOrderById = async (req, res) => {
  const {  IdAccesorioOrdenCompra } = req.params;
  try {
    const result = await PuchaseAccesoriesOrder.findOne({ where: {  IdAccesorioOrdenCompra} })
    
    if(result == 0){
        res.status(404).json({ error: "Accesorio_Inventario no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllPuchaseAccesoriesOrder = async (req, res) => {
  try {
    const result = await PuchaseAccesoriesOrder.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreatePuchaseAccesoriesOrder,
  UpdatePuchaseAccesoriesOrder,
  DeletePuchaseAccesoriesOrder,
  DeleteMultiplePuchaseAccesoriesOrder,
  FindOnePuchaseAccesoriesOrderById ,
  FindAllPuchaseAccesoriesOrder
};

module.exports = all;