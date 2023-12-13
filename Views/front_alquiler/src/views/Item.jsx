import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const Item = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdArticulo
    Descripcion: "",
    PrecioArticulo: "",
    IdCategoria: "",
    IdColor: "",
    IdTalla: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");
  const [categoriaOptions, setCategoriaOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [tallaOptions, setTallaOptions] = useState([]);

  const PerPage = 10;
  const form = "item";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
    handleGetCategoria();
    handleGetColor();
    handleGetTalla();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetCategoria();
    handleGetColor();
    handleGetTalla();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetCategoria();
    handleGetColor();
    handleGetTalla();
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

  const handleGetCategoria = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/categorys`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdCategoria, //lo que selecciona en el back
        label: element.Descripcion + " - " + element.IdCategoria, //lo que se ve en el selector
      }));
      setCategoriaOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetColor = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/Colors`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdColor, //lo que selecciona en el back
        label: element.Descripcion + " - " + element.IdColor, //lo que se ve en el selector
      }));
      setColorOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetTalla = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/sizes`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdTalla, //lo que selecciona en el back
        label: element.Descripcion + " - " + element.IdTalla, //lo que se ve en el selector
      }));
      setTallaOptions(newOptions);
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
      setForm((prev) => prev.filter((info) => info.IdArticulo != id));
      setDeleted(true);
      if (selected && selected.IdArticulo == id) {
        setSelected(null);
        setNews({
          IdArticulo: "",
          Descripcion: "",
          PrecioArticulo: "",
          IdCategoria: "",
          IdColor: "",
          IdTalla: "",
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
      IdArticulo: news.IdArticulo,
      Descripcion: news.Descripcion,
      PrecioArticulo: news.PrecioArticulo,
      IdCategoria: news.IdCategoria,
      IdColor: news.IdColor,
      IdTalla: news.IdTalla,
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
        IdArticulo: "",
        Descripcion: "",
        PrecioArticulo: "",
        IdCategoria: "",
        IdColor: "",
        IdTalla: "",
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
      `${URL}${PORT}/${form}/${selected.IdArticulo}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdArticulo: news.IdArticulo,
          Descripcion: news.Descripcion,
          PrecioArticulo: news.PrecioArticulo,
          IdCategoria: news.IdCategoria,
          IdColor: news.IdColor,
          IdTalla: news.IdTalla,
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdArticulo == data.IdArticulo ? data : estado
      )
    );
    setSelected(null);
    setNews({
      IdArticulo: "",
      Descripcion: "",
      PrecioArticulo: "",
      IdCategoria: "",
      IdColor: "",
      IdTalla: "",
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
            <TitleCataComponente title="Articulos" size="h6" />

            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por Articulo"} //no es necesario
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

                <InputCataComponente
                  value={news.PrecioArticulo}
                  onChange={handleInput}
                  placeholder={"Ingrese precio"}
                  id={"PrecioArticulo"}
                  type={"number"}
                  name={"PrecioArticulo"}
                  label={"PrecioArticulo"}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar categoria -"}
                  name={"IdCategoria"}
                  value={news.IdCategoria}
                  options={categoriaOptions}
                  onChange={handleSelect}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar color "}
                  name={"IdColor"}
                  value={news.IdColor}
                  options={colorOptions}
                  onChange={handleSelect}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar talla -"}
                  name={"IdTalla"}
                  value={news.IdTalla}
                  options={tallaOptions}
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
              idField={"IdArticulo"}
              Fields={[
                "Descripcion",
                "PrecioArticulo",
                "IdCategoria",
                "IdColor",
                "IdTalla",
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

export default Item;
