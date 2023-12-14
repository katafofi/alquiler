import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const Clients = () => {
  const [forms, setForm] = useState([]);
  const [fotoDocumento, setFotoDocumento] = useState(null);
  const [fotoServicioPublico, setFotoServicioPublico] = useState(null);
  const [news, setNews] = useState({
    //IdCategoria
    Nombre: "",
    Apellido: "",
    Correo: "",
    Direccion: "",
    Telefono: "",
    ReferenciaPersonalNombre: "",
    ReferenciaPersonalTelefono: "",
    FotoDocumento: "",
    FotoServicioPublico: "",
    Fecha: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");

  const PerPage = 10;
  const form = "Clients";

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
          setForm((prev) => prev.filter((info) => info.IdCliente != id));
          setDeleted(true);
          if (selected && selected.IdCliente == id) {
            setSelected(null);
            setNews({
              IdCliente: "",
              Nombre: "",
              Apellido: "",
              Cedula: "",
              Correo: "",
              Direccion: "",
              Telefono: "",
              ReferenciaPersonalNombre: "",
              ReferenciaPersonalTelefono: "",
              FotoDocumento: null,
              FotoServicioPublico: null,
              Fecha: "",
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
      IdCliente: news.IdCliente,
      Nombre: news.Nombre,
      Apellido: news.Apellido,
      Cedula: news.Cedula,
      Correo: news.Correo,
      Direccion: news.Direccion,
      Telefono: news.Telefono,
      ReferenciaPersonalNombre: news.ReferenciaPersonalNombre,
      ReferenciaPersonalTelefono: news.ReferenciaPersonalTelefono,
      FotoDocumento: fotoDocumento,
      FotoServicioPublico: fotoServicioPublico,
      Fecha: news.Fecha,
    });
  };

  const handleCreate = async () => {
    try {

      const formData = new FormData()

      formData.append("Nombre", news.Nombre)
      formData.append("Apellido", news.Apellido)
      formData.append("Cedula", news.Cedula)
      formData.append("Correo", news.Correo)
      formData.append("Direccion", news.Direccion)
      formData.append("Telefono", news.Telefono)
      formData.append("ReferenciaPersonalNombre", news.ReferenciaPersonalNombre)
      formData.append("ReferenciaPersonalTelefono", news.ReferenciaPersonalTelefono)
      formData.append("FotoDocumento", fotoDocumento, fotoDocumento.name)
      formData.append("FotoServicioPublico", fotoServicioPublico, fotoServicioPublico.name)
      formData.append("Fecha", news.Fecha)

      for (const entry of formData.entries()) {
        //console.log(entry);
      }

      const response = await fetch(`${URL}${PORT}/${form}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setForm((prev) => [...prev, data]);
      setNews({
        IdCliente: "",
        Nombre: "",
        Apellido: "",
        Cedula: "",
        Correo: "",
        Direccion: "",
        Telefono: "",
        ReferenciaPersonalNombre: "",
        ReferenciaPersonalTelefono: "",
        FotoDocumento: null,
        FotoServicioPublico: null,
        Fecha: "",
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

  const handleInputFileDocumentoChange = (event) => {
    const file = event.target.files[0];
    setFotoDocumento(file);
  };

  const handleInputFileServicioPublicoChange = (event) => {
    const file = event.target.files[0];
    setFotoServicioPublico(file);
  };

  const handleUpdate = async () => {
    const response = await fetch(
      `${URL}${PORT}/${form}/${selected.IdCliente}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdCliente: news.IdCliente,
          Nombre: news.Nombre,
          Apellido: news.Apellido,
          Cedula: news.Cedula,
          Correo: news.Correo,
          Direccion: news.Direccion,
          Telefono: news.Telefono,
          ReferenciaPersonalNombre: news.ReferenciaPersonalNombre,
          ReferenciaPersonalTelefono: news.ReferenciaPersonalTelefono,
          FotoDocumento: fotoDocumento,
          FotoServicioPublico: fotoServicioPublico,
          Fecha: news.Fecha,
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) => (estado.IdCliente == data.IdCliente ? data : estado))
    );
    setSelected(null);
    setNews({
      IdCliente: "",
      Nombre: "",
      Apellido: "",
      Cedula: "",
      Correo: "",
      Direccion: "",
      Telefono: "",
      ReferenciaPersonalNombre: "",
      ReferenciaPersonalTelefono: "",
      FotoDocumento: null,
      FotoServicioPublico: null,
      Fecha: "",
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
    .filter((item) => item?.Cedula?.toString().toLowerCase()
      .includes(filter.toString().toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Cliente" size="h6" />
            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por cedula"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              {/* AGREGAR SCROLL STYLE EN FORM-ROW */}
              <div className="form-row" style={{overflowY: 'scroll', height: '23em',lineHeight:'1em'}} >
                <InputCataComponente
                  value={news.Nombre}
                  onChange={handleInput}
                  placeholder={"Ingrese nombre"}
                  id={"Nombre"}
                  type={"text"}
                  name={"Nombre"}
                  label={"Nombre"}
                />

                <InputCataComponente
                  value={news.Apellido}
                  onChange={handleInput}
                  placeholder={"Ingrese apellido"}
                  id={"Apellido"}
                  type={"text"}
                  name={"Apellido"}
                  label={"Apellido"}
                />

                <InputCataComponente
                  value={news.Cedula}
                  onChange={handleInput}
                  placeholder={"Ingrese número de cédula"}
                  id={"Cedula"}
                  type={"text"}
                  name={"Cedula"}
                  label={"Cédula"}
                />

                <InputCataComponente
                  value={news.Correo}
                  onChange={handleInput}
                  placeholder={"Ingrese correo"}
                  id={"Correo"}
                  type={"email"}
                  name={"Correo"}
                  label={"Correo"}
                />

                <InputCataComponente
                  value={news.Direccion}
                  onChange={handleInput}
                  placeholder={"Ingrese dirección"}
                  id={"Direccion"}
                  type={"text"}
                  name={"Direccion"}
                  label={"Direccion"}
                />

                <InputCataComponente
                  value={news.Telefono}
                  onChange={handleInput}
                  placeholder={"Ingrese teléfono"}
                  id={"Telefono"}
                  type={"text"}
                  name={"Telefono"}
                  label={"Telefono"}
                />

                <InputCataComponente
                  value={news.ReferenciaPersonalNombre}
                  onChange={handleInput}
                  placeholder={"Ingrese nombre de referencia personal"}
                  id={"ReferenciaPersonalNombre"}
                  type={"text"}
                  name={"ReferenciaPersonalNombre"}
                  label={"Referencia Personal Nombre"}
                />

                <InputCataComponente
                  value={news.ReferenciaPersonalTelefono}
                  onChange={handleInput}
                  placeholder={"Ingrese teléfono de referencia personal"}
                  id={"ReferenciaPersonalTelefono"}
                  type={"text"}
                  name={"ReferenciaPersonalTelefono"}
                  label={"Referencia Personal Telefono"}
                />

                <InputCataComponente
                  onChange={handleInputFileDocumentoChange}
                  placeholder={"Ingrese URL de foto de documento"}
                  id={"FotoDocumento"}
                  type={"file"}
                  name={"FotoDocumento"}
                  label={"Foto de Documento"}
                />

                <InputCataComponente
                  onChange={handleInputFileServicioPublicoChange}
                  placeholder={"Ingrese URL de foto de servicio público"}
                  id={"FotoServicioPublico"}
                  type={"file"}
                  name={"FotoServicioPublico"}
                  label={"Foto de Servicio Público"}
                />

                <InputCataComponente
                  value={news.Fecha}
                  onChange={handleInput}
                  placeholder={"Ingrese fecha"}
                  id={"Fecha"}
                  type={"date"}
                  name={"Fecha"}
                  label={"Fecha"}
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
              idField={"IdCliente"}
              Fields={["Nombre", "Apellido", "Correo", "Cedula", "FotoDocumento", "FotoServicioPublico"]}
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

export default Clients;
