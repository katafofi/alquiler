import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";
import { Button } from "react-bootstrap";

const newsDefault = {
  Nombre: "",
  Apellido: "",
  Cedula: "",
  Correo: "",
  Direccion: "",
  Barrio: "",
  Telefono: "",
  ReferenciaPersonalNombre: "",
  ReferenciaPersonalTelefono: "",
  Fecha: new Date().toISOString().split('T')[0],
}

function verificarDatos(formulario) {
  if (
    formulario['Telefono'].length < 11
    || formulario['ReferenciaPersonalTelefono'].length < 11
  ) return false;

  for (let clave in formulario) {
    if (clave !== 'Correo'
      && formulario[clave] === "") {
      return false;
    }
  }
  return true;
}

const Clients = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState(newsDefault);
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");

  const PerPage = 300;
  const form = "Clients";
  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
  }, [selected]);

  useEffect(() => {
    handleGet();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    setDeletedM(false);
  }, [deletedM]);

  // useEffect(() => {
  //   console.log(news)
  // }, [news])


  const handleGet = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}`);
      const data = await response.json();
      setForm(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    if (window.confirm("¿Estás seguro de que quieres eliminar?")) {
      try {
        const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
          method: "DELETE",
        });
        setForm((prev) => prev.filter((info) => info.IdCliente != id));
        setDeleted(true);
        if (selected && selected.IdCliente == id) {
          setSelected(null);
          setNews(newsDefault);
        }
      } catch (error) {
        console.log(error);
      }
    }

  };

  const handleDeleteM = async (ids) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar?")) {
      try {
        const response = await fetch(`${URL}${PORT}/${form}/delete/all`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ids),
        });
        setDeletedM(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async (news) => {
    console.log(news)
    setSelected(news);
    setNews({
      Nombre: news.Nombre,
      Apellido: news.Apellido,
      Cedula: news.Cedula,
      Correo: news.Correo,
      Direccion: news.Direccion,
      Barrio: news.Barrio,
      Telefono: news.Telefono,
      ReferenciaPersonalNombre: news.ReferenciaPersonalNombre,
      ReferenciaPersonalTelefono: news.ReferenciaPersonalTelefono,
      Fecha: news.Fecha ? new Date(news.Fecha).toISOString().split('T')[0] : '',
    });
  };

  const handleCreate = async () => {
    try {
      console.log(news)
      const response = await fetch(`${URL}${PORT}/${form}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
      });
      const data = await response.json();
      setForm((prev) => [...prev, data]);
      setNews(newsDefault);
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


  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${URL}${PORT}/${form}/${selected.IdCliente}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(news),
        }
      );

      const data = await response.json();

      setForm((prev) =>
        prev.map((estado) => (estado.IdCliente === data.IdCliente ? data : estado))
      );

      setSelected(null);

      setNews(newsDefault);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
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
      if (verificarDatos(news)) {
        try {
          handleCreate();
        } catch (error) {
          console.error("Error al crear:", error);
        }
      } else {
        alert("Porfavor ingrese todos los datos obligatorios, verifique que los celulares estén correctos y valide que el usuario no exista antes de guardar.")
      }
    }
  };

  const handleReset = () => {
    setSelected(null);
    setNews(newsDefault);
  }

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    setFilter("");
  };

  const indexOfLast = (currentPage + 1) * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = forms
    .filter((item) => item?.Cedula?.toString().toLowerCase()
      .includes(filter.toString().toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Cliente" size="h6" />
            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por cedula"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              {/* AGREGAR SCROLL STYLE EN FORM-ROW */}
              <div className="form-row" style={{ overflowY: 'scroll', height: '23em', lineHeight: '1em' }} >
                <InputCataComponente
                  value={news.Nombre}
                  onChange={handleInput}
                  placeholder={"Ingrese nombre"}
                  id={"Nombre"}
                  type={"text"}
                  name={"Nombre"}
                  label={"Nombre"}
                />

                <InputCataComponente
                  value={news.Apellido}
                  onChange={handleInput}
                  placeholder={"Ingrese apellido"}
                  id={"Apellido"}
                  type={"text"}
                  name={"Apellido"}
                  label={"Apellido"}
                />

                <InputCataComponente
                  value={news.Cedula}
                  onChange={handleInput}
                  placeholder={"Ingrese número de cédula"}
                  id={"Cedula"}
                  type={"text"}
                  name={"Cedula"}
                  label={"Cédula"}
                />

                <InputCataComponente
                  value={news.Correo}
                  onChange={handleInput}
                  placeholder={"Ingrese correo"}
                  id={"Correo"}
                  type={"email"}
                  name={"Correo"}
                  label={"Correo"}
                />

                <InputCataComponente
                  value={news.Direccion}
                  onChange={handleInput}
                  placeholder={"Ingrese dirección"}
                  id={"Direccion"}
                  type={"text"}
                  name={"Direccion"}
                  label={"Direccion"}
                />
                <InputCataComponente
                  value={news.Barrio}
                  onChange={handleInput}
                  placeholder={"Ingrese barrio"}
                  id={"Barrio"}
                  type={"text"}
                  name={"Barrio"}
                  label={"Barrio"}
                />

                <InputCataComponente
                  value={news.Telefono}
                  onChange={handleInput}
                  placeholder={"Ingrese teléfono"}
                  id={"Telefono"}
                  type={"text"}
                  name={"Telefono"}
                  label={"Telefono"}
                />

                <InputCataComponente
                  value={news.ReferenciaPersonalNombre}
                  onChange={handleInput}
                  placeholder={"Ingrese nombre de referencia personal"}
                  id={"ReferenciaPersonalNombre"}
                  type={"text"}
                  name={"ReferenciaPersonalNombre"}
                  label={"Referencia Personal Nombre"}
                />

                <InputCataComponente
                  value={news.ReferenciaPersonalTelefono}
                  onChange={handleInput}
                  placeholder={"Ingrese teléfono de referencia"}
                  id={"ReferenciaPersonalTelefono"}
                  type={"text"}
                  name={"ReferenciaPersonalTelefono"}
                  label={"Referencia Personal Telefono"}
                />

                <InputCataComponente
                  value={news.Fecha}
                  onChange={handleInput}
                  placeholder={"Ingrese fecha"}
                  id={"Fecha"}
                  type={"date"}
                  name={"Fecha"}
                  label={"Fecha"}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <ButtonCataComponente
                    type="submit"
                    className="btn btn-primary btn-block"
                    title={selected ? "Actualizar" : "Guardar"}
                  />
                  {selected && <Button variant="primary" onClick={handleReset}>Nuevo Cliente</Button>}
                </div>
              </div>
            </form>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <TabletCataComponente
              data={current.reverse()}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDeleteM={handleDeleteM}
              idField={"IdCliente"}
              Fields={["Nombre", "Apellido", "Correo", "Cedula", "Direccion", "Barrio"]}
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
export default Clients;