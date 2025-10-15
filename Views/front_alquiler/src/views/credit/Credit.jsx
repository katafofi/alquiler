
import { useState, useEffect } from "react";
import { DateTime } from "luxon"; // Importar DateTime de la biblioteca Luxon
import ButtonCataComponente from "../../components/provider/Button/Button";
import TitleCataComponente from "../../components/provider/Title/Title";
import InputCataComponente from "../../components/provider/Input/Input";
import TabletCataComponente from "../../components/provider/Table/Table";
import PaginateCataComponente from "../../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../../components/provider/Select/Select";
import SearchCataComponente from "../../components/provider/Search/Search";
import InvoicePreview from "../Invoice/InvoicePreview";
import sha256 from "crypto-js/sha256";

const Credit = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdPago
    FechadPago: DateTime.now().setZone('America/Bogota').toISODate(), // Obtener la fecha actual en la zona horaria de Colombia
    IdEstadoPago: "",
    IdTipoPago: "",
    IdOrdenCompra: "",
    nombre: "",
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
  const [existPurchaseOrder, setExistPurchaseOrder] = useState(false)
  const [invoiceModalActive, setInvoiceModalActive] = useState(false)
  const [newPaymentId, setNewPaymentId] = useState(null)


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
// 🔸 Asegúrate de tener esta importación al inicio del archivo:

const handleDelete = async (id) => {
  if (!window.confirm("¿Estás seguro de que quieres eliminar este registro?")) return;

  // Crear modal
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
      <h5>Confirmar eliminación</h5>
      <p>Por favor ingrese la contraseña para continuar:</p>
      <input type="password" id="deletePassword" placeholder="Contraseña" 
             style="width:100%; padding:8px; margin:10px 0; border-radius:6px; border:1px solid #ccc;">
      <div style="display:flex; gap:10px; justify-content:center; margin-top:10px;">
        <button id="cancelDelete" style="padding:6px 12px; background:#ccc; border:none; border-radius:5px;">Cancelar</button>
        <button id="confirmDelete" style="padding:6px 12px; background:#dc3545; color:white; border:none; border-radius:5px;">Eliminar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  return new Promise((resolve) => {
    document.getElementById("cancelDelete").onclick = () => {
      modal.remove();
      resolve();
    };

    document.getElementById("confirmDelete").onclick = async () => {
      const inputPassword = document.getElementById("deletePassword").value.trim();

      // Clave correcta "202312"
      const hashedCorrectPassword = sha256("202312").toString();

      // Generar hash del input ingresado
      const hashedInput = sha256(inputPassword).toString();

      console.log("Ingresada:", inputPassword);
      console.log("Hash generado:", hashedInput);
      console.log("Hash correcto:", hashedCorrectPassword);

      if (hashedInput !== hashedCorrectPassword) {
        alert("❌ Contraseña incorrecta. Operación cancelada.");
        modal.remove();
        resolve();
        return;
      }

      try {
        const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el registro.");

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
            nombre: "",
          });
        }

        alert("✅ Registro eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("⚠️ No se pudo eliminar el registro.");
      } finally {
        modal.remove();
        resolve();
      }
    };
  });
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
        console.log(response);
        setDeletedM(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async (news) => {
    setSelected(news);
    console.log(news);
    setNews({
      IdPago: news.IdPago,
      FechadPago: news.FechadPago.split('T')[0],
      Valor: news.Valor,
      IdEstadoPago: news.IdEstadoPago,
      IdTipoPago: news.IdTipoPago,
      IdOrdenCompra: news.IdOrdenCompra,
      nombre: news.nombre
    });
    setExistPurchaseOrder(true)
  };

  const handleCreate = async () => {
    try {
      const currentDateTime = DateTime.now().setZone('America/Bogota');
      const newNews = {
        ...news,
        FechadPago: currentDateTime.toISODate(),
      };
  
      const response = await fetch(`${URL}${PORT}/${form}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNews),
      });
      const data = await response.json();
      setForm((prev) => [...prev, data]);
      setNews({
        IdPago: "",
        FechadPago: currentDateTime.toISODate(),
        Valor: "",
        IdEstadoPago: "",
        IdTipoPago: "",
        IdOrdenCompra: "",
        nombre: "",
      });
      return data;
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
    if (e.target.name === "IdOrdenCompra") checkIdExist(e)
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
        nombre: news.nombre
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
      nombre: "",
    });
  };


 const handleSubmit = async (e) => {
  e.preventDefault();

  if (selected) {
    // Crear modal seguro
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
        <p>Ingrese la contraseña para actualizar:</p>
        <input type="password" id="updatePassword" placeholder="Contraseña"
               style="width:100%; padding:8px; margin:10px 0; border-radius:6px; border:1px solid #ccc;">
        <div style="display:flex; gap:10px; justify-content:center; margin-top:10px;">
          <button id="cancelUpdate" style="padding:6px 12px; background:#ccc; border:none; border-radius:5px;">Cancelar</button>
          <button id="confirmUpdate" style="padding:6px 12px; background:#007bff; color:white; border:none; border-radius:5px;">Actualizar</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Esperar interacción
    document.getElementById("cancelUpdate").onclick = () => {
      modal.remove();
    };

    document.getElementById("confirmUpdate").onclick = async () => {
      const inputPassword = document.getElementById("updatePassword").value.trim();

      // Clave válida = "202312"
      const hashedCorrectPassword = sha256("202312").toString();
      const hashedInput = sha256(inputPassword).toString();

      if (hashedInput !== hashedCorrectPassword) {
        alert("❌ Contraseña incorrecta. No tienes permiso para actualizar.");
        modal.remove();
        return;
      }

      if (window.confirm("¿Estás seguro de que quieres actualizar este registro?")) {
        try {
          await handleUpdate();
          e.target.reset();
          alert("✅ Registro actualizado correctamente.");
        } catch (error) {
          console.error("Error al actualizar:", error);
          alert("⚠️ Error al intentar actualizar el registro.");
        } finally {
          modal.remove();
        }
      } else {
        modal.remove();
      }
    };
  } else {
    // Si no hay selección, se crea un nuevo registro normalmente
    try {
      const data = await handleCreate();
      setNewPaymentId(data.IdOrdenCompra);
      setInvoiceModalActive(true);
      setExistPurchaseOrder(false);
      e.target.reset();
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
                <div className='form-group'>
                  <label htmlFor={"IdOrdenCompra"}>ID Orden de compra:</label>
                  <input  //los input son para ingreso de inaformacion 
                    className='form-control'
                    label={"- SeleccionarOrdenPago -"}
                    name={"IdOrdenCompra"}
                    id={"IdOrdenCompra"}
                    value={news.IdOrdenCompra}
                    onChange={handleInput}
                    placeholder={"Ingrese la orden de compra"}
                    type={"number"}
                  />
                  {!existPurchaseOrder &&
                    <p className="text-danger">La orden de compra no existe</p>
                  }
                  <br />
                </div>

                <InputCataComponente
                  value={news.FechadPago}
                  onChange={handleInput}
                  placeholder={"Ingrese Fecha de pago"}
                  id={"FechadPago"}
                  type={"date"}
                  name={"FechadPago"}
                  label={"FechadPago"}
                  disabled={existPurchaseOrder ? false : true}
                />

                <InputCataComponente
                  value={news.Valor}
                  onChange={handleInput}
                  placeholder={"Ingrese precio"}
                  id={"Valor"}
                  type={"number"}
                  name={"Valor"}
                  label={"Valor"}
                  disabled={existPurchaseOrder ? false : true}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar Estado De pago -"}
                  name={"IdEstadoPago"}
                  value={news.IdEstadoPago}
                  options={EstadoPagoOptions}
                  onChange={handleSelect}
                  disabled={existPurchaseOrder ? false : true}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar Tipo de pago "}
                  name={"IdTipoPago"}
                  value={news.IdTipoPago}
                  options={TipoPagoOptions}
                  onChange={handleSelect}
                  disabled={existPurchaseOrder ? false : true}
                />


                <InputCataComponente
                  value={news.nombre}
                  onChange={handleInput}
                  placeholder={"Ingrese nombre"}
                  id={"nombre"}
                  type={"text"}
                  name={"nombre"}
                  label={"nombre"}
                  disabled={existPurchaseOrder ? false : true}
                />

                <ButtonCataComponente
                  type="submit"
                  className="btn btn-primary btn-block"
                  title="Guardar"
                  disabled={existPurchaseOrder ? false : true}
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
      <InvoicePreview
        id={newPaymentId}
        invoiceModalActive={invoiceModalActive}
        setInvoiceModalActive={setInvoiceModalActive}
      />
    </>
  );
}

export default Credit

