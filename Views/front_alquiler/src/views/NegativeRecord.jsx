import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const NegativeRecord = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdRegistroNegativo
    IdOrdenCompra: "",
    IdEstadoRegistroNegativo: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionsRegistroNegativo, setOptionsRegistroNegativo] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");

  const PerPage = 10;
  const form = "negativeRecord";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
    handleGetOrdenCompra();
    handleGetEstadoRegistroNegativo();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetOrdenCompra();
    handleGetEstadoRegistroNegativo();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetOrdenCompra();
    handleGetEstadoRegistroNegativo();
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

  const handleGetOneEmpleado = async (IdEmpleado) => {
    const response = await  fetch(`${URL}${PORT}/employe/${IdEmpleado}`);
    const data = await response.json();
    return data.message.Nombre + " " + data.message.Apellido;
  }

  const handleGetOrdenCompra = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/PuchaseOrder`);
      const data = await response.json();
      const newOptions = await Promise.all(
        data.map(async (element) => {
          const employe = await handleGetOneEmpleado(element.IdEmpleado);
          return {
            value: element.IdOrdenCompra, //lo que selecciona en el back
            label: employe + " - orden de compra:" + element.IdOrdenCompra, //lo que se ve en el selector
          };
        })
      )
      setOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetEstadoRegistroNegativo = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/StatusRegisterNegative`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element. IdEstadoRegistroNegativo, //lo que selecciona en el back
        label: element.Descripcion + " " + element.IdEstadoRegistroNegativo, //lo que se ve en el selector
      }));
      setOptionsRegistroNegativo(newOptions);
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
          setForm((prev) =>
            prev.filter((info) => info.IdRegistroNegativo != id)
          );
          setDeleted(true);
          if (selected && selected.IdRegistroNegativo == id) {
            setSelected(null);
            setNews({
              IdRegistroNegativo: "",
              IdOrdenCompra: "",
              IdEstadoRegistroNegativo: "",
            });
          }
        } catch (error) {
          console.log(error);
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
      IdRegistroNegativo: news.IdRegistroNegativo,
      IdOrdenCompra: news.IdOrdenCompra,
      IdEstadoRegistroNegativo: news.IdEstadoRegistroNegativo,
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
        IdRegistroNegativo: "",
        IdOrdenCompra: "",
        IdEstadoRegistroNegativo: "",
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
      `${URL}${PORT}/${form}/${selected.IdRegistroNegativo}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdRegistroNegativo:news.IdRegistroNegativo,
          IdOrdenCompra: news.IdOrdenCompra,
          IdEstadoRegistroNegativo: news.IdEstadoRegistroNegativo,
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdRegistroNegativo == data.IdRegistroNegativo ? data : estado
      )
    );
    setSelected(null);
    setNews({
      IdRegistroNegativo: "",
      IdOrdenCompra: "",
      IdEstadoRegistroNegativo: "",
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
      item.IdRegistroNegativo.toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="registro negativo" size="h6" />
            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por "}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">

                <SelectCataComponente
                  required
                  label={"- Seleccionar Orden de compra -"}
                  name={"IdOrdenCompra"}
                  value={news.IdOrdenCompra}
                  options={options}
                  onChange={handleSelect}
                />
                <SelectCataComponente
                  required
                  label={"- Seleccionar estado registro negativo-"}
                  name={"IdEstadoRegistroNegativo"}
                  value={news.IdEstadoRegistroNegativo}
                  options={optionsRegistroNegativo}
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
              idField={"IdRegistroNegativo"}
              Fields={[
                "IdOrdenCompra",
              "IdEstadoRegistroNegativo"
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

export default NegativeRecord;
