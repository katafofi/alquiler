import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";

const Employe = () => {
  const [forms, setForm] = useState([]);
  const [newEmploye, setNewEmploye] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Direccion: "",
    Cedula: "",
    Telefono: "",
    IdEstadoEmpleado: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);

  const PerPage = 3;
  const form = "employe";

  const URL = "http://localhost:";
  const PORT = "3002";

  useEffect(() => {
    handleGet();
    handleGetEstadoEmpleado();
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetEstadoEmpleado();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetEstadoEmpleado();
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

  const handleGetEstadoEmpleado = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/employeStatus`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdEstadoEmpleado,
        label: element.Descripcion,
      }));
      setOptions(newOptions);
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
          setForm((prev) => prev.filter((info) => info.IdEmpleado != id));
          setDeleted(true);
          if (selected && selected.IdEmpleado == id) {
            setSelected(null);
            setNewEmploye({
              IdEmpleado: "",
              Nombre: "",
              Apellido: "",
              Correo: "",
              Direccion: "",
              Cedula: "",
              Telefono: "",
              IdEstadoEmpleado: "",
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

  const handleEdit = async (employe) => {
    setSelected(employe);
    setNewEmploye({
      IdEmpleado: employe.IdEmpleado,
      Nombre: employe.Nombre,
      Apellido: employe.Apellido,
      Correo: employe.Correo,
      Direccion: employe.Direccion,
      Cedula: employe.Cedula,
      Telefono: employe.Telefono,
      IdEstadoEmpleado: employe.IdEstadoEmpleado,
    });
  };

  const handleCreate = async (news) => {
    try {
      news = newEmploye;
      const response = await fetch(`${URL}${PORT}/${form}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
      });
      const data = await response.json();
      setForm((prev) => [...prev, data]);
      setNewEmploye({
        IdEmpleado: "",
        Nombre: "",
        Apellido: "",
        Correo: "",
        Direccion: "",
        Cedula: "",
        Telefono: "",
        IdEstadoEmpleado: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewEmploye((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setNewEmploye((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const response = await fetch(
      `${URL}${PORT}/${form}/${selected.IdEmpleado}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdEmpleado: newEmploye.IdEmpleado,
          Nombre: newEmploye.Nombre,
          Apellido: newEmploye.Apellido,
          Correo: newEmploye.Correo,
          Direccion: newEmploye.Direccion,
          Cedula: newEmploye.Cedula,
          Telefono: newEmploye.Telefono,
          IdEstadoEmpleado: newEmploye.IdEstadoEmpleado,
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdEstadoEmpleado == data.IdEstadoEmpleado ? data : estado
      )
    );
    setSelected(null);
    setNewEmploye({
      IdEmpleado: "",
      Nombre: "",
      Apellido: "",
      Correo: "",
      Direccion: "",
      Cedula: "",
      Telefono: "",
      IdEstadoEmpleado: "",
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
  };

  const indexOfLast = (currentPage + 1) * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = forms.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Empleados" size="h6" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={newEmploye.Nombre}
                  onChange={handleInput}
                  placeholdel={"Ingrese nombre empleado"}
                  id={"Nombre"}
                  type={"text"}
                  name={"Nombre"}
                  label={"Nombre"}
                />

                <InputCataComponente
                  value={newEmploye.Apellido}
                  onChange={handleInput}
                  placeholdel={"Ingrese apellido empleado"}
                  id={"Apellido"}
                  type={"text"}
                  name={"Apellido"}
                  label={"Apellido"}
                />

                <InputCataComponente
                  value={newEmploye.Correo}
                  onChange={handleInput}
                  placeholdel={"Ingrese correo empleado"}
                  id={"Correo"}
                  type={"text"}
                  name={"Correo"}
                  label={"Correo"}
                />

                <InputCataComponente
                  value={newEmploye.Direccion}
                  onChange={handleInput}
                  placeholdel={"Ingrese direccion empleado"}
                  id={"Direccion"}
                  type={"text"}
                  name={"Direccion"}
                  label={"Direccion"}
                />

                <InputCataComponente
                  value={newEmploye.Cedula}
                  onChange={handleInput}
                  placeholdel={"Ingrese cedula empleado"}
                  id={"Cedula"}
                  type={"text"}
                  name={"Cedula"}
                  label={"Cedula"}
                />

                <InputCataComponente
                  value={newEmploye.Telefono}
                  onChange={handleInput}
                  placeholdel={"Ingrese telefono empleado"}
                  id={"Telefono"}
                  type={"text"}
                  name={"Telefono"}
                  label={"Telefono"}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar un Estado empleado -"}
                  name={"IdEstadoEmpleado"}
                  value={newEmploye.IdEstadoEmpleado}
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
              idField={"IdEmpleado"}
              Fields={[
                "Nombre",
                "Apellido",
                "Correo",
                "Direccion",
                "Cedula",
                "Telefono",
                "IdEstadoEmpleado",
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

export default Employe;
