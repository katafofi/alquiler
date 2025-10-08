import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const AccesoriesInventory = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    Cantidad: "",
    IdAccesorio: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");

  const PerPage = 10;
  const form = "AccesoriesInventory";

  const URL = "http://localhost:";
  const PORT = "3003";

  // 🔐 Función personalizada para pedir credencial oculta
  const solicitarCredencial = () => {
    return new Promise((resolve) => {
      // Crear el contenedor del modal
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "9999";

      // Crear el contenido del modal
      const box = document.createElement("div");
      box.style.backgroundColor = "white";
      box.style.padding = "20px";
      box.style.borderRadius = "10px";
      box.style.textAlign = "center";
      box.innerHTML = `
        <h5>Ingrese la credencial de autorización</h5>
        <input id="credencialInput" type="password" placeholder="••••••" style="padding: 8px; width: 80%; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px;" />
        <br/>
        <button id="okBtn" style="margin-right: 10px; padding: 5px 15px;">Aceptar</button>
        <button id="cancelBtn" style="padding: 5px 15px;">Cancelar</button>
      `;
      modal.appendChild(box);
      document.body.appendChild(modal);

      // Obtener elementos
      const input = box.querySelector("#credencialInput");
      const okBtn = box.querySelector("#okBtn");
      const cancelBtn = box.querySelector("#cancelBtn");

      // Eventos
      okBtn.addEventListener("click", () => {
        const value = input.value;
        modal.remove();
        resolve(value);
      });
      cancelBtn.addEventListener("click", () => {
        modal.remove();
        resolve(null);
      });
    });
  };

  // ------------------------------
  // useEffects
  // ------------------------------
  useEffect(() => {
    handleGet();
    handleGetAccesorios();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetAccesorios();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetAccesorios();
    setDeletedM(false);
  }, [deletedM]);

  // ------------------------------
  // Funciones principales
  // ------------------------------
  const handleGet = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}`);
      const data = await response.json();
      setForm(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAccesorios = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/accesories`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdAccesorio,
        label: element.Descripcion + " - " + element.IdOrdenCompra,
      }));
      setOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------------------
  // CRUD
  // ------------------------------
  const handleDelete = async (id) => {
    const credencial = await solicitarCredencial();
    if (credencial === "202312") {
      if (window.confirm("¿Estás seguro de que quieres eliminar?")) {
        try {
          const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
            method: "DELETE",
          });
          console.log(response);
          setForm((prev) =>
            prev.filter((info) => info.IdInventarioAccesorio != id)
          );
          setDeleted(true);
          if (selected && selected.IdInventarioAccesorio == id) {
            setSelected(null);
            setNews({
              IdInventarioAccesorio: "",
              Cantidad: "",
              IdAccesorio: "",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("Credencial incorrecta o cancelada.");
    }
  };

  const handleDeleteM = async (ids) => {
    const credencial = await solicitarCredencial();
    if (credencial === "202312") {
      if (window.confirm("¿Estás seguro de que quieres eliminar todos?")) {
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
      alert("Credencial incorrecta o cancelada.");
    }
  };

  const handleEdit = async (news) => {
    setSelected(news);
    setNews({
      IdInventarioAccesorio: news.IdInventarioAccesorio,
      Cantidad: news.Cantidad,
      IdAccesorio: news.IdAccesorio,
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
        IdInventarioAccesorio: "",
        Cantidad: "",
        IdAccesorio: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const response = await fetch(
      `${URL}${PORT}/${form}/${selected.IdInventarioAccesorio}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdInventarioAccesorio: news.IdInventarioAccesorio,
          Cantidad: news.Cantidad,
          IdAccesorio: news.IdAccesorio,
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdInventarioAccesorio == data.IdInventarioAccesorio
          ? data
          : estado
      )
    );
    setSelected(null);
    setNews({
      IdInventarioAccesorio: "",
      Cantidad: "",
      IdAccesorio: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      const credencial = await solicitarCredencial();
      if (credencial === "202312") {
        if (window.confirm("¿Estás seguro de que quieres actualizar este?")) {
          try {
            handleUpdate();
          } catch (error) {
            console.error("Error al actualizar:", error);
          }
        }
      } else {
        alert("Credencial incorrecta o cancelada.");
      }
    } else {
      try {
        handleCreate();
      } catch (error) {
        console.error("Error al crear:", error);
      }
    }
  };

  // ------------------------------
  // Filtros y paginación
  // ------------------------------
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    setFilter("");
  };

  const indexOfLast = (currentPage + 1) * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = forms
    .filter((item) => {
      const idAccesorio = item?.IdAccesorio ?? "";
      return idAccesorio
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase());
    })
    .slice(indexOfFirst, indexOfLast);

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Inventario de Accesorios" size="h6" />
            <SearchCataComponente
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por ID Accesorio"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={news.Cantidad}
                  onChange={(e) =>
                    setNews({ ...news, [e.target.name]: e.target.value })
                  }
                  placeholder={"Ingrese Cantidad"}
                  id={"Cantidad"}
                  type={"number"}
                  name={"Cantidad"}
                  label={"Cantidad"}
                />

                <SelectCataComponente
                  required
                  label={"Seleccionar un Accesorio -"}
                  name={"IdAccesorio"}
                  value={news.IdAccesorio}
                  options={options}
                  onChange={(e) =>
                    setNews({ ...news, [e.target.name]: e.target.value })
                  }
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
              idField={"IdInventarioAccesorio"}
              Fields={["Cantidad", "IdAccesorio"]}
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

export default AccesoriesInventory;
