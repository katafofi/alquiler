import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const Store = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdTienda
    Nit: "",
    Nombre: "",
    Direccion: "",
    Telefono: "",
    Correo: "",
    Logo: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");

  const PerPage = 10;
  const form = "Store";

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
    if (window.prompt("Ingrese la credencial de autorizacion", 0) == "202312") {
      if (window.confirm("¿Estás seguro de que quieres eliminar?")) {
        try {
          const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
            method: "DELETE",
          });
          console.log(response);
          setForm((prev) => prev.filter((info) => info.IdTienda != id));
          setDeleted(true);
          if (selected && selected.IdTienda == id) {
            setSelected(null);
            setNews({
              IdTienda: "",
              Nit: "",
              Nombre: "",
              Direccion: "",
              Telefono: "",
              Correo: "",
              Logo: "",
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
      IdTienda: news.IdTienda,
      Nit: news.Nit,
      Nombre: news.Nombre,
      Direccion: news.Direccion,
      Telefono: news.Telefono,
      Correo: news.Correo,
      Logo: news.Logo,
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
        IdTienda: "",
        Nit: "",
        Nombre: "",
        Direccion: "",
        Telefono: "",
        Correo: "",
        Logo: "",
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
    const response = await fetch(`${URL}${PORT}/${form}/${selected.IdTienda}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IdTienda: news.IdTienda,
        Nit: news.Nit,
        Nombre: news.Nombre,
        Direccion: news.Direccion,
        Telefono: news.Telefono,
        Correo: news.Correo,
        Logo: news.Logo,
      }),
    });
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) => (estado.IdTienda == data.IdTienda ? data : estado))
    );
    setSelected(null);
    setNews({
      IdTienda: "",
      Nit: "",
      Nombre: "",
      Direccion: "",
      Telefono: "",
      Correo: "",
      Logo: "",
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
      item.Nombre.toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="tiendas" size="h6" />
            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar portienda Estado"} //no es necesario
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={news.Nit}
                  onChange={handleInput}
                  placeholder={"Ingrese NIT"}
                  id={"Nit"}
                  type={"text"}
                  name={"Nit"}
                  label={"NIT"}
                />

                <InputCataComponente
                  value={news.Nombre}
                  onChange={handleInput}
                  placeholder={"Ingrese nombre de la tienda"}
                  id={"Nombre"}
                  type={"text"}
                  name={"Nombre"}
                  label={"Nombre de la Tienda"}
                />
                <InputCataComponente
                  value={news.Direccion}
                  onChange={handleInput}
                  placeholder={"Ingrese dirección de la tienda"}
                  id={"Direccion"}
                  type={"text"}
                  name={"Direccion"}
                  label={"Dirección de la Tienda"}
                />
                <InputCataComponente
                  value={news.Telefono}
                  onChange={handleInput}
                  placeholder={"Ingrese número de teléfono"}
                  id={"Telefono"}
                  type={"text"}
                  name={"Telefono"}
                  label={"Teléfono"}
                />
                <InputCataComponente
                  value={news.Correo}
                  onChange={handleInput}
                  placeholder={"Ingrese correo electrónico"}
                  id={"Correo"}
                  type={"email"}
                  name={"Correo"}
                  label={"Correo Electrónico"}
                />
                <InputCataComponente
                  value={news.Logo}
                  onChange={handleInput}
                  placeholder={"Ingrese ruta o nombre del logo"}
                  id={"Logo"}
                  type={"text"}
                  name={"Logo"}
                  label={"Logo de la Tienda"}
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
              idField={"IdTienda"}
              Fields={[
                "Nombre",
                "Nit",
                "Direccion",
                "Telefono",
                "Correo",
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

export default Store;
