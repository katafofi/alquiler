import React, { useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";
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
    FechadPago: "",
    Valor: "",
    IdEstadoPago: "",
    IdTipoPago: "",
    IdOrdenCompra: "",
    nombre: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [EstadoPagoOptions, setEstadoPagoOptions] = useState([]);
  const [TipoPagoOptions, setTipoPagoOptions] = useState([]);
  const [OrdenCompraOptions, setOrdenCompraOptions] = useState([]);

  const PerPage = 300;
  const form = "payments";
  const URL = "http://localhost:";
  const PORT = "3003";
  const correctPasswordHash = sha256("202312").toString();

  useEffect(() => {
    handleGet();
    handleGetEstadoPago();
    handleGetTipoPago();
    handleGetOrdenCompra();
  }, [selected, deleted, deletedM]);

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
      setEstadoPagoOptions(
        data.map((e) => ({
          value: e.IdEstadoPago,
          label: `${e.Descripcion} - ${e.IdEstadoPago}`,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTipoPago = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/paymentType`);
      const data = await response.json();
      setTipoPagoOptions(
        data.map((e) => ({
          value: e.IdTipoPago,
          label: `${e.Descripcion} - ${e.IdTipoPago}`,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetOrdenCompra = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/PuchaseOrder`);
      const data = await response.json();
      setOrdenCompraOptions(
        data.map((e) => ({
          value: e.IdOrdenCompra,
          label: `${e.FechaCompra} - ${e.IdOrdenCompra}`,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 🔒 Modal seguro de autenticación
  const askForPassword = () => {
    return new Promise((resolve) => {
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";

      modal.innerHTML = `
        <div style="background:white; padding:20px; border-radius:10px; max-width:350px; text-align:center;">
          <h5>Autorización requerida</h5>
          <p>Ingrese la contraseña:</p>
          <input type="password" id="authPassword" placeholder="Contraseña"
                 style="width:100%; padding:8px; margin:10px 0; border-radius:6px; border:1px solid #ccc;">
          <div style="display:flex; gap:10px; justify-content:center;">
            <button id="cancelAuth" style="padding:6px 12px; background:#ccc; border:none; border-radius:5px;">Cancelar</button>
            <button id="confirmAuth" style="padding:6px 12px; background:#007bff; color:white; border:none; border-radius:5px;">Aceptar</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      document.getElementById("cancelAuth").onclick = () => {
        modal.remove();
        resolve(false);
      };

      document.getElementById("confirmAuth").onclick = () => {
        const password = document.getElementById("authPassword").value.trim();
        const hashed = sha256(password).toString();
        modal.remove();
        resolve(hashed === correctPasswordHash);
      };
    });
  };

  const handleDelete = async (id) => {
    const authorized = await askForPassword();
    if (!authorized) {
      alert("❌ Contraseña incorrecta o acción cancelada.");
      return;
    }

    if (window.confirm("¿Estás seguro de que quieres eliminar?")) {
      try {
        const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
          method: "DELETE",
        });
        console.log(response);
        setForm((prev) => prev.filter((info) => info.IdPago !== id));
        setDeleted(true);
        if (selected && selected.IdPago === id) {
          setSelected(null);
          setNews({
            IdPago: "",
            FechadPago: "",
            Valor: "",
            IdEstadoPago: "",
            IdTipoPago: "",
            IdOrdenCompra: "",
            nombre: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteM = async (ids) => {
    const authorized = await askForPassword();
    if (!authorized) {
      alert("❌ Contraseña incorrecta o acción cancelada.");
      return;
    }

    if (window.confirm("¿Estás seguro de que quieres eliminar los seleccionados?")) {
      try {
        const response = await fetch(`${URL}${PORT}/${form}/delete/all`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ids),
        });
        console.log(response);
        setDeletedM(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (news) => {
    setSelected(news);
    setNews({
      IdPago: news.IdPago,
      FechadPago: news.FechadPago,
      Valor: news.Valor,
      IdEstadoPago: news.IdEstadoPago,
      IdTipoPago: news.IdTipoPago,
      IdOrdenCompra: news.IdOrdenCompra,
      nombre: news.nombre,
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
        IdPago: "",
        FechadPago: "",
        Valor: "",
        IdEstadoPago: "",
        IdTipoPago: "",
        IdOrdenCompra: "",
        nombre: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputSearch = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
    if (name === "filter") setFilter(value);
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
    const response = await fetch(`${URL}${PORT}/${form}/${selected.IdPago}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(news),
    });
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) => (estado.IdPago === data.IdPago ? data : estado))
    );
    setSelected(null);
    setNews({
      IdPago: "",
      FechadPago: "",
      Valor: "",
      IdEstadoPago: "",
      IdTipoPago: "",
      IdOrdenCompra: "",
      nombre: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      const authorized = await askForPassword();
      if (!authorized) {
        alert("❌ Contraseña incorrecta o acción cancelada.");
        return;
      }

      if (window.confirm("¿Estás seguro de que quieres actualizar este registro?")) {
        try {
          await handleUpdate();
          alert("✅ Registro actualizado correctamente.");
        } catch (error) {
          console.error("Error al actualizar:", error);
        }
      }
    } else {
      try {
        await handleCreate();
      } catch (error) {
        console.error("Error al crear:", error);
      }
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLast = (currentPage + 1) * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = forms
    .filter((item) =>
      item.IdOrdenCompra?.toString().toLowerCase().includes(filter.toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <TitleCataComponente title="Pagos" size="h6" />
          <SearchCataComponente
            value={filter}
            onChange={handleInputSearch}
            type="search"
            name="filter"
            id="filter"
            placeholder="Buscar orden de compra"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <form onSubmit={handleSubmit} className="mb-4">
            <InputCataComponente
              value={news.FechadPago}
              onChange={handleInput}
              placeholder="Ingrese Fecha de pago"
              id="FechadPago"
              type="date"
              name="FechadPago"
              label="Fecha de pago"
            />

            <InputCataComponente
              value={news.Valor}
              onChange={handleInput}
              placeholder="Ingrese valor"
              id="Valor"
              type="number"
              name="Valor"
              label="Valor"
            />

            <SelectCataComponente
              required
              label="- Seleccionar Estado de pago -"
              name="IdEstadoPago"
              value={news.IdEstadoPago}
              options={EstadoPagoOptions}
              onChange={handleSelect}
            />

            <SelectCataComponente
              required
              label="- Seleccionar Tipo de pago -"
              name="IdTipoPago"
              value={news.IdTipoPago}
              options={TipoPagoOptions}
              onChange={handleSelect}
            />

            <SelectCataComponente
              required
              label="- Seleccionar Orden de compra -"
              name="IdOrdenCompra"
              value={news.IdOrdenCompra}
              options={OrdenCompraOptions}
              onChange={handleSelect}
            />

            <InputCataComponente
              value={news.nombre}
              onChange={handleInput}
              placeholder="Ingrese nombre"
              id="nombre"
              type="text"
              name="nombre"
              label="Nombre"
            />

            <ButtonCataComponente
              type="submit"
              className="btn btn-primary btn-block"
              title="Guardar"
            />
          </form>
        </div>

        <div className="col-lg-8">
          <TabletCataComponente
            data={current}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleDeleteM={handleDeleteM}
            idField="IdPago"
            Fields={["FechadPago", "Valor", "IdEstadoPago", "IdTipoPago", "IdOrdenCompra"]}
          />
          <PaginateCataComponente
            data={forms}
            PerPage={PerPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Payments;
