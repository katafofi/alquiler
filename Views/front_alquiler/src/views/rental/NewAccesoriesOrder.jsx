import { useState, useEffect } from "react";
import ButtonCataComponente from "../../components/provider/Button/Button";
import InputCataComponente from "../../components/provider/Input/Input";
import { SelectCataComponente } from "../../components/provider/Select/Select";


const NewAccesoriesOrder = ({ updateActiveKeys }) => {
  const [news, setNews] = useState({
    // IdAccesorioOrdenCompra
    cantidad: "",
    IdOrdenCompra: "",
    IdAccesorio: ""
  });

  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);

  const form = "PuchaseAccesoriesOrder";

  const URL = "http://localhost:";
  const PORT = "3003";


  useEffect(() => {
    handleGetOrdenCompra();
    handleGetAccesorios();
  }, []);


  const handleGetOrdenCompra = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/PuchaseOrder`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdOrdenCompra, //lo que selecciona en el back
        label: element.FechaCompra + ' - ' + element.IdOrdenCompra //lo que se ve en el selector
      }));
      setOptions2(newOptions);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
      });
      const data = await response.json();
      setForm((prev) => [...prev, data]);
      setNews({
        IdAccesorioOrdenCompra: "",
        cantidad: "",
        IdOrdenCompra: "",
        IdAccesorio: ""

      });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {

      if (window.confirm("¿Estás seguro de que quieres actualizar este?")) {
        try {
          handleUpdate();
        } catch (error) {
          console.error("Error al actualizar:", error);
        }
      }

    } else {
      try {
        handleCreate();
      } catch (error) {
        console.error("Error al crear:", error);
      }
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">

                <InputCataComponente
                  value={news.cantidad}
                  onChange={handleInput}
                  placeholder={"Ingrese cantidad"}
                  id={"cantidad"}
                  type={"number"}
                  name={"cantidad"}
                  label={"cantidad"}
                />


                <           SelectCataComponente
                  required
                  label={"- Seleccionar orden de compra"}
                  name={"IdOrdenCompra"}
                  value={news.IdOrdenCompra}
                  options={options2}
                  onChange={handleSelect}
                />


                <SelectCataComponente
                  required
                  label={" Seleccionar un Accesorio -"}
                  name={"IdAccesorio"}
                  value={news.IdAccesorio}
                  options={options}
                  onChange={handleSelect}
                />

                <ButtonCataComponente
                  type="submit"
                  className="btn btn-primary btn-block"
                  title="Guardar"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewAccesoriesOrder