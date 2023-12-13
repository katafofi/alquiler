import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const PuchaseOrder = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdOrdenCompra
    FechaCompra: "",
    IdAlquiler: "",
    IdEmpleado: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [optionsSelectedFilter, setOptionsSelectedFilter] = useState([]);
  const [optionSelectFilter, setOptionSelectFilter] = useState("");
  const [filter, setFilter] = useState("")

  const PerPage = 10;
  const form = "PuchaseOrder";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
    handleGetAlquiler();
    handleGetEmpleado();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetAlquiler();
    handleGetEmpleado();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetAlquiler();
    handleGetEmpleado();
    setDeletedM(false);
  }, [deletedM]);

  const handleGet = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}`);
      const data = await response.json();
      setForm(data);
      const availableOptions = ["IdOrdenCompra", "FechaCompra", "IdEmpleado", "IdAlquiler"];
      const newOptionsSelectedFilter = availableOptions.map(option => ({
        value: option,
        label: option,
      }));
      setOptionsSelectedFilter(newOptionsSelectedFilter);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetOneTienda = async (IdTienda) => {
    const response = await fetch(`${URL}${PORT}/Store/${IdTienda}`);
    const data = await response.json();
    return data.message.Nombre + " " + data.message.Nit;
  };

  const handleGetOneCliente = async (IdCliente) => {
    const response = await fetch(`${URL}${PORT}/clients/${IdCliente}`);
    const data = await response.json();
    return data.message.Nombre + " " + data.message.Apellido;
  };

  const handleGetAlquiler = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/renting`);
      const data = await response.json();
      const newOptions = await Promise.all(
        data.map(async (element) => {
          const client = await handleGetOneCliente(element.IdCliente);
          const tienda = await handleGetOneTienda(element.IdTienda);
          return {
            value: element.IdAlquiler,
            label: `${client} - ${tienda} - ${element.IdAlquiler}`,
          };
        })
      );
      setOptions2(newOptions);
    } catch (error) {
      console.error("Error in handleGetAlquiler:", error);
    }
  };

  const handleGetEmpleado = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/employe`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdEmpleado, //lo que selecciona en el back
        label:
          element.Nombre + " " + element.Apellido + " - " + element.IdEmpleado, //lo que se ve en el selector
      }));
      setOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const generateVoice = async (id) => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}/invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.prompt("Ingrese la credencial de autorizacion", 0) == "202312") {
      if (window.confirm("¿Estás seguro de que quieres eliminar?")) {
        try {
          const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
            method: "DELETE",
          });
          console.log(response);
          setForm((prev) => prev.filter((info) => info.IdOrdenCompra != id));
          setDeleted(true);
          if (selected && selected.IdOrdenCompra == id) {
            setSelected(null);
            setNews({
              IdOrdenCompra: "",
              FechaCompra: "",
              IdAlquiler: "",
              IdEmpleado: "",
              Total: ""
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("No esta permitido para las credenciales por defecto.");
    }
  };

  const handleDeleteM = async (ids) => {
    if (window.prompt("Ingrese la credencial de autorizacion", 0) == "202312") {
      if (window.confirm("¿Estás seguro de que quieres eliminar?")) {
        try {
          const response = await fetch(`${URL}${PORT}/${form}/delete/all`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ids),
          });
          console.log(response);
          setDeletedM(true);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("No esta permitido para las credenciales por defecto.");
    }
  };

  const handleEdit = async (news) => {
    setSelected(news);
    setNews({
      IdOrdenCompra: news.IdOrdenCompra,
      FechaCompra: news.FechaCompra,
      IdAlquiler: news.IdAlquiler,
      IdEmpleado: news.IdEmpleado,
      Total: news.Total
    });
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
        IdOrdenCompra: "",
        FechaCompra: "",
        IdAlquiler: "",
        IdEmpleado: "",
        Total: ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputSearch = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
    if (name === "filter") {
      setFilter(value);
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

  const handleUpdate = async () => {
    const response = await fetch(
      `${URL}${PORT}/${form}/${selected.IdOrdenCompra}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdOrdenCompra: news.IdOrdenCompra,
          FechaCompra: news.FechaCompra,
          IdAlquiler: news.IdAlquiler,
          IdEmpleado: news.IdEmpleado,
          Total: news.Total
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdOrdenCompra == data.IdOrdenCompra ? data : estado
      )
    );
    setSelected(null);
    setNewEmploye({
      IdOrdenCompra: "",
      FechaCompra: "",
      IdAlquiler: "",
      IdEmpleado: "",
      Total: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      if (
        window.prompt("Ingrese la credencial de autorizacion", 0) == "202312"
      ) {
        if (window.confirm("¿Estás seguro de que quieres actualizar este?")) {
          try {
            handleUpdate();
          } catch (error) {
            console.error("Error al actualizar:", error);
          }
        }
      } else {
        alert("No esta permitido para las credenciales por defecto.");
      }
    } else {
      try {
        handleCreate();
      } catch (error) {
        console.error("Error al crear:", error);
      }
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    setFilter("");
  };

  const indexOfLast = (currentPage + 1) * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = forms
    .filter((item) => 
      item.IdOrdenCompra.toString().toLowerCase().includes(filter.toString().toLowerCase())
    ).slice(indexOfFirst, indexOfLast);
  //const current = forms.filter((item) => item.IdAlquiler.toString().toLowerCase().includes(filter.toString().toLowerCase())).slice(indexOfFirst, indexOfLast)

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Orden Compra" size="h6" />
            
            <SelectCataComponente
              required
              style={{ 'width': '100px'}}
              label={"- Seleccionar un campo -"}
              name={"Campos a filtrar"}
              value={optionSelectFilter}
              options={optionsSelectedFilter}
              onChange={handleSelect}
            />
            
            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por orden compra"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={news.FechaCompra}
                  onChange={handleInput}
                  placeholder={"Ingrese FechaCompra"}
                  id={"FechaCompra"}
                  type={"date"}
                  name={"FechaCompra"}
                  label={"FechaCompra"}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar empleado -"}
                  name={"IdEmpleado"}
                  value={news.IdEmpleado}
                  options={options}
                  onChange={handleSelect}
                />
                <SelectCataComponente
                  required
                  label={"- Seleccionar alquiler -"}
                  name={"IdAlquiler"}
                  value={news.IdAlquiler}
                  options={options2}
                  onChange={handleSelect}
                />

                <InputCataComponente
                  value={news.Total}
                  onChange={handleInput}
                  placeholder={"Ingrese Total"}
                  id={"Total"}
                  type={"number"}
                  name={"Total"}
                  label={"Total"}
                />

                <ButtonCataComponente
                  type="submit"
                  className="btn btn-primary btn-block"
                  title="Guardar"
                />
              </div>
            </form>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <TabletCataComponente
              data={current}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDeleteM={handleDeleteM}
              generateVoice={generateVoice}
              idField={"IdOrdenCompra"}
              Fields={[
                "FechaCompra",
                "IdAlquiler",
                "IdEmpleado",
                "IdOrdenCompra",
                "Total",
                "createdAt",
                "updatedAt",
              ]}
            />
            <PaginateCataComponente
              data={forms}
              PerPage={PerPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PuchaseOrder;
