import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const RentingRefunt = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdRegistroDevolucion:
    Descripcion: "",
    IdAlquiler: "",
    IdEmpleado: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");
  const [EmpleadoOptions, setEmpleadoOptions] = useState([]);
  const [AlquilerOptions, setAlquilerOptions] = useState([]);

  const PerPage = 10;
  const form = "rentalrefurnt";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
    handleGetEmpleado();
    handleGetAlquiler();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetEmpleado();
    handleGetAlquiler();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetEmpleado();
    handleGetAlquiler();
    setDeletedM(false);
  }, [deletedM]);

  const handleGet = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}`);
      const data = await response.json();
      setForm(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetEmpleado = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/employe`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdEmpleado, //lo que selecciona en el back
        label: element.Nombre + " - " + element.Apellido + element.IdEmpleado, //lo que se ve en el selector
      }));
      setEmpleadoOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAlquiler = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/renting`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdAlquiler, //lo que selecciona en el back
        label: element.IdAlquiler, //lo que se ve en el selector
      }));
      setAlquilerOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      setForm((prev) => prev.filter((info) => info.IdRegistroDevolucion != id));
      setDeleted(true);
      if (selected && selected.IdRegistroDevolucion == id) {
        setSelected(null);
        setNews({
          IdRegistroDevolucion: "",
          Descripcion: "",
          IdAlquiler: "",
          IdEmpleado: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteM = async (ids) => {
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
  };

  const handleEdit = async (news) => {
    setSelected(news);
    setNews({
      IdRegistroDevolucion: news.IdRegistroDevolucion,
      Descripcion: news.Descripcion,
      IdAlquiler: news.IdAlquiler,
      IdEmpleado: news.IdEmpleado,
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
        IdRegistroDevolucion: "",
        Descripcion: "",
        IdAlquiler: "",
        IdEmpleado: "",
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
      `${URL}${PORT}/${form}/${selected.IdRegistroDevolucion}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            IdRegistroDevolucion: news.IdRegistroDevolucion,
            Descripcion: news.Descripcion,
            IdAlquiler: news.IdAlquiler,
            IdEmpleado: news.IdEmpleado
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado. IdRegistroDevolucion == data. IdRegistroDevolucion ? data : estado
      )
    );
    setSelected(null);
    setNews({
        IdRegistroDevolucion: "",
        Descripcion: "",
        IdAlquiler: "",
        IdEmpleado: "",
    
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      try {
        handleUpdate();
      } catch (error) {
        console.error("Error al actualizar:", error);
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
      item?.Descripcion?.toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);
  console.log;
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Alquiler" size="h6" />

            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por Descripcion"} //no es necesario
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                
                <InputCataComponente
                  value={news.Descripcion}
                  onChange={handleInput}
                  placeholder={"Ingrese descripcion"}
                  id={"Descripcion"}
                  type={"text"}
                  name={"Descripcion"}
                  label={"Descripcion"}
                />

                 <SelectCataComponente
                  required
                  label={"- Seleccionar Idaqluiler -"}
                  name={"IdAlquiler"}
                  value={news.IdAlquiler}
                  options={AlquilerOptions}
                  onChange={handleSelect}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar Empelado "}
                  name={"IdEmpleado"}
                  value={news.IdEmpleado}
                  options={EmpleadoOptions}
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
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <TabletCataComponente
              data={current}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDeleteM={handleDeleteM}
              idField={"IdRegistroDevolucion"}
              Fields={[
                "Descripcion",
                "IdAlquiler",
                "IdEmpleado"
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

export default RentingRefunt;
