import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const Employe = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Direccion: "",
    Cedula: "",
    Telefono: "",
    IdEstadoEmpleado: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("")

  const PerPage = 10;
  const form = "employe";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
    handleGetEstadoEmpleado();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetEstadoEmpleado();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetEstadoEmpleado();
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

  const handleGetEstadoEmpleado = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/employeStatus`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdEstadoEmpleado,
        label: element.Descripcion,
      }));
      setOptions(newOptions);
    } catch (error) {
      console.log(error);
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
          setForm((prev) => prev.filter((info) => info.IdEmpleado != id));
          setDeleted(true);
          if (selected && selected.IdEmpleado == id) {
            setSelected(null);
            setNews({
              IdEmpleado: "",
              Nombre: "",
              Apellido: "",
              Correo: "",
              Direccion: "",
              Cedula: "",
              Telefono: "",
              IdEstadoEmpleado: "",
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

  const handleEdit = async (employe) => {
    setSelected(employe);
    setNews({
      IdEmpleado: employe.IdEmpleado,
      Nombre: employe.Nombre,
      Apellido: employe.Apellido,
      Correo: employe.Correo,
      Direccion: employe.Direccion,
      Cedula: employe.Cedula,
      Telefono: employe.Telefono,
      IdEstadoEmpleado: employe.IdEstadoEmpleado,
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
        IdEmpleado: "",
        Nombre: "",
        Apellido: "",
        Correo: "",
        Direccion: "",
        Cedula: "",
        Telefono: "",
        IdEstadoEmpleado: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputSearch = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
    if (name === "filter") {
      setFilter(value)
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
      `${URL}${PORT}/${form}/${selected.IdEmpleado}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdEmpleado: news.IdEmpleado,
          Nombre: news.Nombre,
          Apellido: news.Apellido,
          Correo: news.Correo,
          Direccion: news.Direccion,
          Cedula: news.Cedula,
          Telefono: news.Telefono,
          IdEstadoEmpleado: news.IdEstadoEmpleado,
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdEstadoEmpleado == data.IdEstadoEmpleado ? data : estado
      )
    );
    setSelected(null);
    setNews({
      IdEmpleado: "",
      Nombre: "",
      Apellido: "",
      Correo: "",
      Direccion: "",
      Cedula: "",
      Telefono: "",
      IdEstadoEmpleado: "",
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
    setFilter("")
  };

  const indexOfLast = (currentPage + 1) * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = forms.filter((item) => item.Cedula.toString().toLowerCase().includes(filter.toString().toLowerCase())).slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Empleados" size="h6" />
            <SearchCataComponente 
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por Cédula"}
            />
          </div>
        </div>
        <div className="row">
        <div className="form-row" style={{overflowY: 'scroll', height: '23em',lineHeight:'1em'}} >
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={news.Nombre}
                  onChange={handleInput}
                  placeholder={"Ingrese nombre empleado"}
                  id={"Nombre"}
                  type={"text"}
                  name={"Nombre"}
                  label={"Nombre"}
                />

                <InputCataComponente
                  value={news.Apellido}
                  onChange={handleInput}
                  placeholder={"Ingrese apellido empleado"}
                  id={"Apellido"}
                  type={"text"}
                  name={"Apellido"}
                  label={"Apellido"}
                />

                <InputCataComponente
                  value={news.Correo}
                  onChange={handleInput}
                  placeholder={"Ingrese correo empleado"}
                  id={"Correo"}
                  type={"text"}
                  name={"Correo"}
                  label={"Correo"}
                />

                <InputCataComponente
                  value={news.Direccion}
                  onChange={handleInput}
                  placeholder={"Ingrese direccion empleado"}
                  id={"Direccion"}
                  type={"text"}
                  name={"Direccion"}
                  label={"Direccion"}
                />

                <InputCataComponente
                  value={news.Cedula}
                  onChange={handleInput}
                  placeholder={"Ingrese cedula empleado"}
                  id={"Cedula"}
                  type={"text"}
                  name={"Cedula"}
                  label={"Cedula"}
                />

                <InputCataComponente
                  value={news.Telefono}
                  onChange={handleInput}
                  placeholder={"Ingrese telefono empleado"}
                  id={"Telefono"}
                  type={"text"}
                  name={"Telefono"}
                  label={"Telefono"}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar un Estado empleado -"}
                  name={"IdEstadoEmpleado"}
                  value={news.IdEstadoEmpleado}
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
          <div className="form-row" style={{overflowY: 'scroll', height: '23em',lineHeight:'1em'}} >
           
            
            <TabletCataComponente
              data={current}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDeleteM={handleDeleteM}
              idField={"IdEmpleado"}
              Fields={[
                "Nombre",
                "Apellido",
                "Correo",
                "Direccion",
                "Cedula",
                "Telefono",
                "IdEstadoEmpleado",
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

export default Employe;
