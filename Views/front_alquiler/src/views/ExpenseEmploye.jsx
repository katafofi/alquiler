import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";


const ExpenseEmploye = () => {
    const [forms, setForm] = useState([]);
    const [news, setNews] = useState({
        //IdGastoEmpleado
        Descripcion: "",
        Monto: "",
        IdEmpleado: ""
    });
    const [selected, setSelected] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [deletedM, setDeletedM] = useState(false);
    const [options, setOptions] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [filter, setFilter] = useState("")

    const PerPage = 10;
    const form = "expense_employe";

    const URL = "http://localhost:";
    const PORT = "3003";

    useEffect(() => {
        handleGet();
        handleGetEmpleado();
      }, [selected]);
    
      useEffect(() => {
        handleGet();
        handleGetEmpleado();
        setDeleted(false);
      }, [deleted]);
    
      useEffect(() => {
        handleGet();
        handleGetEmpleado();
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

      const handleGetEmpleado = async () => {
        try {
          const response = await fetch(`${URL}${PORT}/employe`);
          const data = await response.json();
          const newOptions = data.map((element) => ({
            value: element.IdEmpleado, //lo que selecciona en el back
            label: element.Nombre+' '+element.Apellido+' - '+element.IdEmpleado, //lo que se ve en el selector
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
              setForm((prev) => prev.filter((info) => info.IdGastoEmpleado != id));
              setDeleted(true);
              if (selected && selected.IdGastoEmpleado == id) {
                setSelected(null);
                setNews({
                    IdGastoEmpleado: "",
                    Descripcion: "",
                    Monto: "",
                    IdEmpleado: ""
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
            IdGastoEmpleado: news.IdGastoEmpleado,
            Descripcion: news.Descripcion,
            Monto: news.Monto,
            IdEmpleado: news.IdEmpleado
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
            IdGastoEmpleado: "",
            Descripcion: "",
            Monto: "",
            IdEmpleado: ""
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
          `${URL}${PORT}/${form}/${selected.IdGastoEmpleado}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                IdGastoEmpleado: news.IdGastoEmpleado,
                Descripcion: news.Descripcion,
                Monto: news.Monto,
                IdEmpleado: news.IdEmpleado
            }),
          }
        );
        const data = await response.json();
        setForm((prev) =>
          prev.map((estado) =>
            estado.IdGastoEmpleado == data.IdGastoEmpleado ? data : estado
          )
        );
        setSelected(null);
        setNewEmploye({
            IdGastoEmpleado: "",
            Descripcion: "",
            Monto: "",
            IdEmpleado: ""
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
        setFilter("")
      };
    
      const indexOfLast = (currentPage + 1) * PerPage;
      const indexOfFirst = indexOfLast - PerPage;
      const current = forms.filter((item) => item.IdEmpleado.toString().toLowerCase().includes(filter.toString().toLowerCase())).slice(indexOfFirst, indexOfLast);

    return (
       <>
       <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="Gastos empleados" size="h6" />
            <SearchCataComponente 
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por Cédula"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
            
                <InputCataComponente
                  value={news.Descripcion}
                  onChange={handleInput}
                  placeholder={"Ingrese descripcion"}
                  id={"Descripcion"}
                  type={"text"}
                  name={"Descripcion"}
                  label={"Descripcion"}
                />

                <InputCataComponente
                  value={news.Monto}
                  onChange={handleInput}
                  placeholder={"Ingrese monto"}
                  id={"Monto"}
                  type={"number"}
                  name={"Monto"}
                  label={"Monto"}
                />


                <SelectCataComponente
                  required
                  label={"- Seleccionar empleado -"}
                  name={"IdEmpleado"}
                  value={news.IdEmpleado}
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
              idField={"IdGastoEmpleado"}
              Fields={[
                "Descripcion",
                "Monto",
                "IdEmpleado",
                "updatedAt",
                "createdAt"
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

export default ExpenseEmploye 