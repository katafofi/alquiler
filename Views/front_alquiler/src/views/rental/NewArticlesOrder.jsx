import { useState, useEffect } from "react";
import ButtonCataComponente from "../../components/provider/Button/Button";
import InputCataComponente from "../../components/provider/Input/Input";
import { SelectCataComponente } from "../../components/provider/Select/Select";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const NewArticlesOrder = (
  {
    rentalStatus,
  }
) => {
  const [news, setNews] = useState({
    //IdArticuloOrdenCompra 
    Cantidad: "",
    IdOrdenCompra: rentalStatus.purchaseOrder.IdOrdenCompra,
    IdArticulo: ""
  });
  const [addedArticles, setAddedArticles] = useState([])
  const [articles, setArticles] = useState([])
  const [options, setOptions] = useState([]);


  const FORM = "PuchaseItemOrder";
  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGetArticulo();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${URL}${PORT}/${FORM}/${id}`, {
        method: "DELETE",
      });
      setAddedArticles(addedArticles.filter(el => el.IdArticuloOrdenCompra !== id))
    } catch (error) {
      console.log(error);
    }
  };


  const handleGetArticulo = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/item`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdArticulo, //lo que selecciona en el back
        label: element.Descripcion + ' - ' + element.IdArticulo //lo que se ve en el selector
      }));
      setOptions(newOptions);
      setArticles(data)
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
        body: JSON.stringify(news),
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
      if (data) setAddedArticles([...addedArticles, data])
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="col-6">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={news.Cantidad}
                  onChange={handleInput}
                  placeholder={"Ingrese Cantidad"}
                  id={"Cantidad"}
                  type={"number"}
                  name={"Cantidad"}
                  label={"Cantidad"}
                />

                <SelectCataComponente
                  required
                  label={" Seleccionar un Accesorio -"}
                  name={"IdArticulo"}
                  value={news.IdArticulo}
                  options={options}
                  onChange={handleSelect}
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
                  <th>Articulo</th>
                </tr>
              </thead>
              <tbody>
                {addedArticles && articles ?
                  addedArticles.map((el, index) => (
                    <tr key={index}>
                      <td>{el.Cantidad}
                      </td>
                      <td>
                        {
                          articles.find(
                            article => article.IdArticulo === parseInt(el.IdArticulo)
                          ).Descripcion
                        }
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(el.IdArticuloOrdenCompra)}
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

export default NewArticlesOrder