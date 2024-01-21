import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";
import InvoicePreview from "./Invoice/InvoicePreview";

const PuchareItemOrder = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdArticuloOrdenCompra 
    Cantidad: "",
    Precio: "",
    IdOrdenCompra: "",
    IdArticulo: ""
  });
  const [selected, setSelected] = useState(null);
  const [lastSelectedPurchaseId, setLastSelectedPurchaseId] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("")
  const [invoiceModalActive, setInvoiceModalActive] = useState(false)

  const PerPage = 200;
  const form = "PuchaseItemOrder";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
    handleGetOrdenCompra();
    handleGetArticulo();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetOrdenCompra();
    handleGetArticulo();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetOrdenCompra();
    handleGetArticulo();
    setDeletedM(false);
  }, [deletedM]);

  const handleGet = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}`);
      const data = await response.json();
      setForm(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleGetOrdenCompra = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/PuchaseOrder`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdOrdenCompra, //lo que selecciona en el back
        label: element.FechaCompra + ' - ' + element.IdOrdenCompra //lo que se ve en el selector
      }));
      setOptions2(newOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetArticulo = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/item`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdArticulo, //lo que selecciona en el back
        label: element.Descripcion + ' - ' + element.IdArticulo //lo que se ve en el selector
      }));
      setOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    try {
      const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
        method: "DELETE",
      });
      setForm((prev) => prev.filter((info) => info.IdArticuloOrdenCompra != id));
      setDeleted(true);
      if (selected && selected.IdArticuloOrdenCompra == id) {
        setSelected(null);
        setNews({
          IdArticuloOrdenCompra: "",
          Cantidad: "",
          Precio: "",
          IdOrdenCompra: "",
          IdArticulo: ""
        });
      }
    } catch (error) {
      console.log(error);
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
    setSelected(news);
    setLastSelectedPurchaseId(news.IdOrdenCompra)
    setNews({
      IdArticuloOrdenCompra: news.IdArticuloOrdenCompra,
      Cantidad: news.Cantidad,
      Precio: news.Precio,
      IdOrdenCompra: news.IdOrdenCompra,
      IdArticulo: news.IdArticulo
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
        IdArticuloOrdenCompra: "",
        Cantidad: "",
        Precio: "",
        IdOrdenCompra: "",
        IdArticulo: ""

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
      `${URL}${PORT}/${form}/${selected.IdArticuloOrdenCompra}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Cantidad: news.Cantidad,
          Precio: news.Precio,
          IdOrdenCompra: news.IdOrdenCompra,
          IdArticulo: news.IdArticulo
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdArticuloOrdenCompra == data.IdArticuloOrdenCompra ? data : estado
      )
    );
    setSelected(null);
    setNews({
      IdArticuloOrdenCompra: "",
      Cantidad: "",
      Precio: "",
      IdOrdenCompra: "",
      IdArticulo: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {

      if (window.confirm("¿Estás seguro de que quieres actualizar este?")) {
        try {
          await handleUpdate();
          setInvoiceModalActive(true)
        } catch (error) {
          console.error("Error al actualizar:", error);
        }
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
  const current = forms.filter((item) => item.IdOrdenCompra.toString().toLowerCase().includes(filter.toString().toLowerCase())).slice(indexOfFirst, indexOfLast);


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
            <TitleCataComponente title="articulo Orden Compra" size="h6" />
            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar articulo orden compra"} //no es necesario 
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">

                <InputCataComponente
                  value={news.Cantidad}
                  onChange={handleInput}
                  placeholder={"Ingrese Cantidad"}
                  id={"Cantidad"}
                  type={"number"}
                  name={"Cantidad"}
                  label={"Cantidad"}
                />
                <InputCataComponente
                  value={news.Precio}
                  onChange={handleInput}
                  placeholder={"Ingrese Precio"}
                  id={"Precio"}
                  type={"number"}
                  name={"Precio"}
                  label={"Precio"}
                />


                <           SelectCataComponente
                  //required
                  label={"- Seleccionar orden de compra"}
                  name={"IdOrdenCompra"}
                  value={news.IdOrdenCompra}
                  options={options2}
                  onChange={handleSelect}
                />


                <SelectCataComponente
                  // required
                  label={" Seleccionar un Accesorio -"}
                  name={"IdArticulo"}
                  value={news.IdArticulo}
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
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <TabletCataComponente
              data={current}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDeleteM={handleDeleteM}
              idField={"IdArticuloOrdenCompra"}
              Fields={[
                "Cantidad",
                "Precio",
                "IdOrdenCompra",
                "IdArticulo"
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
}

export default PuchareItemOrder;