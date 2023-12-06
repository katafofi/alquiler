import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const Payments = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdPago
    FechadPago: "",
    Valor: "",
    IdEstadoPago: "",
    IdTipoPago: "",
    IdOrdenCompra: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");
  const [EstadoPagoOptions, setEstadoPagoOptions] = useState([]);
  const [TipoPagoOptions, setTipoPagoOptions] = useState([]);
  const [OrdenCompraOptions, setOrdenCompraOptions] = useState([]);

  const PerPage = 10;
  const form = "payments";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
    handleGetEstadoPago();
    handleGetTipoPago();
    handleGetOrdenCompra();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetEstadoPago();
    handleGetTipoPago();
    handleGetOrdenCompra();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetEstadoPago();
    handleGetTipoPago();
    handleGetOrdenCompra();
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

  const handleGetEstadoPago = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/statusPay`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdEstadoPago, //lo que selecciona en el back
        label: element.Descripcion + " - " + element.IdEstadoPago, //lo que se ve en el selector
      }));
      setEstadoPagoOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTipoPago = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/paymentType`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdTipoPago, //lo que selecciona en el back
        label: element.Descripcion + " - " + element.IdTipoPago, //lo que se ve en el selector
      }));
      setTipoPagoOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetOrdenCompra = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/PuchaseOrder`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdOrdenCompra, //lo que selecciona en el back
        label: element.FechaCompra + " - " + element.IdOrdenCompra, //lo que se ve en el selector
      }));
      setOrdenCompraOptions(newOptions);
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
          setForm((prev) => prev.filter((info) => info.IdPago != id));
          setDeleted(true);
          if (selected && selected.IdPago == id) {
            setSelected(null);
            setNews({
              IdPago: "",
              FechadPago: "",
              Valor: "",
              IdEstadoPago: "",
              IdTipoPago: "",
              IdOrdenCompra: "",
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
      IdPago: news.IdPago,
      FechadPago: news.FechadPago,
      Valor: news.Valor,
      IdEstadoPago: news.IdEstadoPago,
      IdTipoPago: news.IdTipoPago,
      IdOrdenCompra: news.IdOrdenCompra,
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
        IdPago: "",
        FechadPago: "",
        Valor: "",
        IdEstadoPago: "",
        IdTipoPago: "",
        IdOrdenCompra: "",
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
    const response = await fetch(`${URL}${PORT}/${form}/${selected.IdPago}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IdPago: news.IdPago,
        FechadPago: news.FechadPago,
        Valor: news.Valor,
        IdEstadoPago: news.IdEstadoPago,
        IdTipoPago: news.IdTipoPago,
        IdOrdenCompra: news.IdOrdenCompra,
      }),
    });
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdPago == data.IdPago ? data : estado
      )
    );
    setSelected(null);
    setNews({
      IdPago: "",
      FechadPago: "",
      Valor: "",
      IdEstadoPago: "",
      IdTipoPago: "",
      IdOrdenCompra: "",
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
    .filter((item) => item?.FechadPago?.toString().toLowerCase()
        .includes(filter.toString().toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);
console.log
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="pagos" size="h6" />

            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por Fecha"} //no es necesario
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">

                <InputCataComponente
                  value={news.FechadPago}
                  onChange={handleInput}
                  placeholder={"Ingrese Fecha de pago"}
                  id={"FechadPago"}
                  type={"date"}
                  name={"FechadPago"}
                  label={"FechadPago"}
                />

                <InputCataComponente
                  value={news.Valor}
                  onChange={handleInput}
                  placeholder={"Ingrese precio"}
                  id={"Valor"}
                  type={"number"}
                  name={"Valor"}
                  label={"Valor"}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar Estado De pago -"}
                  name={"IdEstadoPago"}
                  value={news.IdEstadoPago}
                  options={EstadoPagoOptions}
                  onChange={handleSelect}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar Tipo de pago "}
                  name={"IdTipoPago"}
                  value={news.IdTipoPago}
                  options={TipoPagoOptions}
                  onChange={handleSelect}
                />

                <SelectCataComponente
                  required
                  label={"- SeleccionarOrdenPago -"}
                  name={"IdOrdenCompra"}
                  value={news.IdOrdenCompra}
                  options={OrdenCompraOptions}
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
              idField={"IdPago"}
              Fields={[
                "FechadPago",
                "Valor",
                "IdEstadoPago",
                "IdTipoPago",
                "IdOrdenCompra",
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

export default Payments;
