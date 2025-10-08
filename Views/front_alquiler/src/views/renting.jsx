import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";
import InvoicePreview from "./Invoice/InvoicePreview";

function formatearFecha(fechaString) {
  let fecha = new Date(fechaString);
  let año = fecha.getUTCFullYear();
  let mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  let dia = fecha.getUTCDate().toString().padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}

const Renting = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    FechaInicialAlquiler: "",
    FechaFinlAlquiler: "",
    IdTienda: "",
    IdCliente: "",
  });
  const [selected, setSelected] = useState(null);
  const [lastSelectedPurchaseId, setLastSelectedPurchaseId] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");
  const [ClienteOptions, setClienteOptions] = useState([]);
  const [TiendaOptions, setTiendaOptions] = useState([]);
  const [invoiceModalActive, setInvoiceModalActive] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState(null);
  const [authPassword, setAuthPassword] = useState(""); // 🆕 para credencial oculta

  const PerPage = 10;
  const form = "renting";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
    handleGetPurchaseOrders();
    handleGetTienda();
    handleGetCliente();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetPurchaseOrders();
    handleGetTienda();
    handleGetCliente();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetPurchaseOrders();
    handleGetTienda();
    handleGetCliente();
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

  const handleGetPurchaseOrders = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/PuchaseOrder`);
      const data = await response.json();
      setPurchaseOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCliente = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/Clients`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdCliente,
        label: `${element.Nombre} ${element.Apellido} - ${element.IdCliente}`,
      }));
      setClienteOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTienda = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/store`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdTienda,
        label: element.IdTienda,
      }));
      setTiendaOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔒 Solicita credencial con campo de tipo password
  const solicitarCredencial = () => {
    return new Promise((resolve) => {
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100vw";
      modal.style.height = "100vh";
      modal.style.background = "rgba(0, 0, 0, 0.5)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "9999";

      modal.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
          <h5>Ingrese la credencial de autorización</h5>
          <input id="credInput" type="password" placeholder="Contraseña" style="padding: 8px; margin: 10px 0; width: 80%;"/>
          <br/>
          <button id="confirmBtn" style="margin-right: 10px; padding: 6px 12px;">Confirmar</button>
          <button id="cancelBtn" style="padding: 6px 12px;">Cancelar</button>
        </div>
      `;

      document.body.appendChild(modal);

      modal.querySelector("#confirmBtn").onclick = () => {
        const valor = modal.querySelector("#credInput").value;
        document.body.removeChild(modal);
        resolve(valor);
      };

      modal.querySelector("#cancelBtn").onclick = () => {
        document.body.removeChild(modal);
        resolve(null);
      };
    });
  };

  const handleDelete = async (id) => {
    const cred = await solicitarCredencial();
    if (cred === "202312") {
      if (window.confirm("¿Estás seguro de que quieres eliminar?")) {
        try {
          const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
            method: "DELETE",
          });
          setForm((prev) => prev.filter((info) => info.IdAlquiler !== id));
          setDeleted(true);
          if (selected && selected.IdAlquiler === id) {
            setSelected(null);
            setNews({
              IdAlquiler: "",
              FechaInicialAlquiler: "",
              FechaFinlAlquiler: "",
              IdTienda: "",
              IdCliente: "",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("Credencial incorrecta o acceso no autorizado.");
    }
  };

  const handleDeleteM = async (ids) => {
    const cred = await solicitarCredencial();
    if (cred === "202312") {
      if (window.confirm("¿Estás seguro de que quieres eliminar múltiples registros?")) {
        try {
          const response = await fetch(`${URL}${PORT}/${form}/delete/all`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ids),
          });
          setDeletedM(true);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("Credencial incorrecta o acceso no autorizado.");
    }
  };

  const handleEdit = async (news) => {
    setSelected(news);
    const order = purchaseOrders?.find(
      (order) => order.IdAlquiler === news.IdAlquiler
    );
    setLastSelectedPurchaseId(order ? order.IdOrdenCompra : null);
    setNews({
      IdAlquiler: news.IdAlquiler,
      FechaInicialAlquiler: formatearFecha(news.FechaInicialAlquiler),
      FechaFinlAlquiler: formatearFecha(news.FechaFinlAlquiler),
      IdTienda: news.IdTienda,
      IdCliente: news.IdCliente,
    });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news),
      });
      const data = await response.json();
      setForm((prev) => [...prev, data]);
      setNews({
        IdAlquiler: "",
        FechaInicialAlquiler: "",
        FechaFinlAlquiler: "",
        IdTienda: "",
        IdCliente: "",
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
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const cred = await solicitarCredencial();
    if (cred === "202312") {
      const response = await fetch(`${URL}${PORT}/${form}/${selected.IdAlquiler}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news),
      });
      const data = await response.json();
      setForm((prev) =>
        prev.map((estado) =>
          estado.IdAlquiler === data.IdAlquiler ? data : estado
        )
      );
      setSelected(null);
      setNews({
        IdAlquiler: "",
        FechaInicialAlquiler: "",
        FechaFinlAlquiler: "",
        IdTienda: "",
        IdCliente: "",
      });
      setInvoiceModalActive(true);
    } else {
      alert("Credencial incorrecta o acceso no autorizado.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {
      try {
        await handleUpdate();
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
    } else {
      try {
        await handleCreate();
      } catch (error) {
        console.error("Error al crear:", error);
      }
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    setFilter("");
  };

  // 🆕 Solución del error — función agregada
  const handleInputSearch = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const indexOfLast = (currentPage + 1) * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = forms
    .filter((item) =>
      item?.IdCliente?.toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="container mt-4">
        {invoiceModalActive && lastSelectedPurchaseId && (
          <InvoicePreview
            id={lastSelectedPurchaseId}
            invoiceModalActive={invoiceModalActive}
            setInvoiceModalActive={setInvoiceModalActive}
          />
        )}
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Alquiler" size="h6" />
            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por Id cliente"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={news.FechaInicialAlquiler}
                  onChange={handleInput}
                  placeholder={"Ingrese fecha inicial"}
                  id={"FechaInicialAlquiler"}
                  type={"date"}
                  name={"FechaInicialAlquiler"}
                  label={"Fecha Inicial Alquiler"}
                />
                <InputCataComponente
                  value={news.FechaFinlAlquiler}
                  onChange={handleInput}
                  placeholder={"Ingrese fecha final"}
                  id={"FechaFinlAlquiler"}
                  type={"date"}
                  name={"FechaFinlAlquiler"}
                  label={"Fecha Final Alquiler"}
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
                  label={"- Seleccionar Cliente -"}
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
          <div className="col-12 col-lg-8">
            <TabletCataComponente
              data={current}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDeleteM={handleDeleteM}
              idField={"IdAlquiler"}
              Fields={[
                "IdAlquiler",
                "FechaInicialAlquiler",
                "FechaFinlAlquiler",
                "IdTienda",
                "IdCliente",
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

export default Renting;
