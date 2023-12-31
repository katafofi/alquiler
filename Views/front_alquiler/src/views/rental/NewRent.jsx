import ButtonCataComponente from "../../components/provider/Button/Button";
import InputCataComponente from "../../components/provider/Input/Input";
import { SelectCataComponente } from "../../components/provider/Select/Select";
import { useEffect, useState } from 'react'

const URL = "http://localhost:";
const PORT = "3003";
const FORM = "renting";

const NewRent = ({ updateActiveKeys, updateRentalStatus }) => {
  const [news, setNews] = useState({
    //IdAlquiler
    FechaInicialAlquiler: "",
    FechaFinlAlquiler: "",
    IdTienda: "",
    IdCliente: "",
  });

  const [ClienteOptions, setClienteOptions] = useState([]);
  const [TiendaOptions, setTiendaOptions] = useState([]);

  const nextKeys = ['1']


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
      if (data) {
        updateRentalStatus({ rent: data })
        updateActiveKeys(nextKeys)
      }
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const getCliente = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/Clients`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdCliente, //lo que selecciona en el back
        label: element.Nombre + " - " + element.Apellido + element.IdCliente, //lo que se ve en el selector
      }));
      setClienteOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const getTienda = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/store`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdTienda, //lo que selecciona en el back
        label: element.Nombre, //lo que se ve en el selector
      }));
      setTiendaOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTienda();
    getCliente();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">

                <InputCataComponente
                  value={news.FechaInicialAlquiler}
                  onChange={handleInput}
                  placeholder={"Ingrese descripcion"}
                  id={"FechaInicialAlquiler"}
                  type={"date"}
                  name={"FechaInicialAlquiler"}
                  label={"FechaInicialAlquiler"}
                />
                <InputCataComponente
                  value={news.FechaFinlAlquiler}
                  onChange={handleInput}
                  placeholder={"Ingrese descripcion"}
                  id={"FechaFinlAlquiler"}
                  type={"date"}
                  name={"FechaFinlAlquiler"}
                  label={"FechaFinlAlquiler"}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar tienda -"}
                  name={"IdTienda"}
                  value={news.IdTienda}
                  options={TiendaOptions}
                  onChange={handleSelect}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar Cliente "}
                  name={"IdCliente"}
                  value={news.IdCliente}
                  options={ClienteOptions}
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
  )
}

export default NewRent