import { useState, useEffect } from "react";
import ButtonCataComponente from "../../components/provider/Button/Button";
import InputCataComponente from "../../components/provider/Input/Input";
import { SelectCataComponente } from "../../components/provider/Select/Select";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { handleDeleteById, handleDeleteM } from "../../utils/requests";


const NewAccesoriesOrder = (
  {
    rentalStatus,
    updateActiveKeys,
    addedAccesories,
    setAddedAccesories,
    addedArticles,
    setAddedArticles
  }
) => {
  const [news, setNews] = useState({
    // IdAccesorioOrdenCompra
    cantidad: "1",
    IdOrdenCompra: "",
    IdAccesorio: ""
  });
  const [accesories, setAaccesories] = useState([])
  const [options, setOptions] = useState([]);

  const FORM = "PuchaseAccesoriesOrder";
  const URL = "http://localhost:";
  const PORT = "3003";

  const prevKeys = ['1']

  useEffect(() => {
    handleGetAccesorios();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${URL}${PORT}/${FORM}/${id}`, {
        method: "DELETE",
      });
      setAddedAccesories(addedAccesories.filter(el => el.IdAccesorioOrdenCompra !== id))
    } catch (error) {
      console.log(error);
    }
  };


  const handleGetAccesorios = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/accesories`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdAccesorio, //lo que selecciona en el back
        label: element.Descripcion + ' - ' + element.IdAccesorio //lo que se ve en el selector
      }));
      setOptions(newOptions);
      setAaccesories(data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${FORM}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...news, IdOrdenCompra: rentalStatus.purchaseOrder.IdOrdenCompra }),
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await handleCreate();
      if (data) setAddedAccesories([...addedAccesories, data])
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleReturnToPurchaseOrder = async () => {
    if (addedArticles.length > 0) {
      await handleDeleteM(addedArticles.map((el) => el.IdArticuloOrdenCompra), "PuchaseItemOrder")
      setAddedArticles([])
    }
    if (addedAccesories.length > 0) {
      await handleDeleteM(addedAccesories.map((el) => el.IdAccesorioOrdenCompra), "PuchaseAccesoriesOrder")
      setAddedAccesories([])
    }
    await handleDeleteById(rentalStatus.purchaseOrder.IdOrdenCompra, "PuchaseOrder")
    updateActiveKeys(prevKeys)
  }

  return (
    <>
      <Container >
        <Row>
          <Col className="col-6">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">

                

                <SelectCataComponente
                  required
                  label={" Seleccionar un Accesorio -"}
                  name={"IdAccesorio"}
                  value={news.IdAccesorio}
                  options={options}
                  onChange={handleSelect}
                />
                  <InputCataComponente
                  value={news.cantidad}
                  onChange={handleInput}
                  placeholder={"Ingrese cantidad"}
                  id={"cantidad"}
                  type={"number"}
                  name={"cantidad"}
                  label={"cantidad"}
                />
                <ButtonCataComponente
                  type="submit"
                  className="btn btn-primary btn-block"
                  title="Agregar"
                />
                
              </div>
            </form>
          </Col>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Accesorio</th>
                </tr>
              </thead>
              <tbody>
                {addedAccesories && accesories ?
                  addedAccesories.map((el, index) => (
                    <tr key={index}>
                      <td>{el.cantidad}
                      </td>
                      <td>
                        {
                          accesories.find(
                            accesory => accesory.IdAccesorio === parseInt(el.IdAccesorio)
                          ).Descripcion
                        }
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(el.IdAccesorioOrdenCompra)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                  :
                  <tr><td></td></tr>
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewAccesoriesOrder