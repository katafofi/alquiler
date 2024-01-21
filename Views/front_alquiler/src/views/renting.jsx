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
  // Agregar 1 al mes porque getMonth() devuelve un índice basado en cero
  let mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
  let dia = fecha.getUTCDate().toString().padStart(2, '0');

  return `${año}-${mes}-${dia}`;
}

const Renting = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdAlquiler
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
  const [invoiceModalActive, setInvoiceModalActive] = useState(false)
  const [purchaseOrders, setPurchaseOrders] = useState(null)

  const PerPage = 10;
  const form = "renting";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
    handleGetPurchaseOrders()
    handleGetTienda();
    handleGetCliente();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetPurchaseOrders()
    handleGetTienda();
    handleGetCliente();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetPurchaseOrders()
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
        value: element.IdCliente, //lo que selecciona en el back
        label: element.Nombre + " - " + element.Apellido + element.IdCliente, //lo que se ve en el selector
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
        value: element.IdTienda, //lo que selecciona en el back
        label: element.IdTienda, //lo que se ve en el selector
      }));
      setTiendaOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
        method: "DELETE",
      });
      setForm((prev) => prev.filter((info) => info.IdAlquiler != id));
      setDeleted(true);
      if (selected && selected.IdAlquiler == id) {
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
      setDeletedM(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (news) => {
    setSelected(news);
    setLastSelectedPurchaseId(purchaseOrders.find(order => order.IdAlquiler === news.IdAlquiler).IdOrdenCompra)
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
        headers: {
          "Content-Type": "application/json",
        },
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
      `${URL}${PORT}/${form}/${selected.IdAlquiler}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdAlquiler: news.IdAlquiler,
          FechaInicialAlquiler: news.FechaInicialAlquiler,
          FechaFinlAlquiler: news.FechaFinlAlquiler,
          IdTienda: news.IdTienda,
          IdCliente: news.IdCliente,
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdAlquiler == data.IdAlquiler ? data : estado
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      try {
        await handleUpdate();
        setInvoiceModalActive(true)
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
      item?.IdCliente?.toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);
  return (
    <>
      <div className="container mt-4">
        {invoiceModalActive && lastSelectedPurchaseId &&
          <InvoicePreview
            id={lastSelectedPurchaseId}
            invoiceModalActive={invoiceModalActive}
            setInvoiceModalActive={setInvoiceModalActive}
          />
        }
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Alquiler" size="h6" />

            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por Id cliente"} //no es necesario
            />
          </div>
        </div>
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
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <TabletCataComponente
              data={current}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDeleteM={handleDeleteM}
              idField={"IdAlquiler"}
              Fields={["IdAlquiler", "FechaInicialAlquiler", "FechaFinlAlquiler", "IdTienda", "IdCliente"]}
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
