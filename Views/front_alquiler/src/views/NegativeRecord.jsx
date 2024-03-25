import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";
import { Button, Col, Row, Table } from "react-bootstrap";

const NegativeRecord = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdRegistroNegativo
    IdCliente: "",
    IdEstadoRegistroNegativo: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [optionsCliente, setOptionsCliente] = useState([]);
  const [optionsRegistroNegativo, setOptionsRegistroNegativo] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");
  const [current, setCurrent] = useState(null);
  const [tableData, setTableData] = useState(null)
  const [clientData, setClientData] = useState(null)
  const [negativeRecord, setNegativeRecord] = useState(null)

  const PerPage = 10;
  const form = "negativeRecord";
  const EMAILFORM = "send-email"
  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    getTableData()
  }, [selected]);

  useEffect(() => {
    handleGet();
    handleGetCliente();
    handleGetEstadoRegistroNegativo()
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    handleGetCliente();
    handleGetEstadoRegistroNegativo()
    setDeletedM(false);
  }, [deletedM]);

  useEffect(() => {
    if (forms.length > 0) {
      setCurrent(forms
        .filter((item) =>
          item.IdRegistroNegativo?.toString()
            .toLowerCase()
            .includes(filter.toString().toLowerCase())
        )
        .slice(indexOfFirst, indexOfLast))
    }
  }, [forms])


  const getTableRowById = ({ IdRegistroNegativo, IdCliente, IdEstadoRegistroNegativo }) => {
    const newClient = clientData.find(el => el.IdCliente == IdCliente)
    const newNegativeRecord = negativeRecord.find(el => el.IdEstadoRegistroNegativo == IdEstadoRegistroNegativo)

    const newTableData = {
      IdRegistroNegativo,
      IdCliente,
      IdEstadoRegistroNegativo,
      cedula: newClient.Cedula,
      name: newClient.Nombre,
      lastName: newClient.Apellido,
      description: newNegativeRecord.Descripcion,
      createdAt: newNegativeRecord.createdAt,
    }

    return newTableData
  }

  const getTableData = async () => {
    const idData = await handleGet();
    const clientData = await handleGetCliente();
    setClientData(clientData)
    const negativeRecord = await handleGetEstadoRegistroNegativo()
    setNegativeRecord(negativeRecord)

    const newTableData = idData.map(i => {
      return {
        ...i,
        clientData: clientData.filter(j => i.IdCliente === j.IdCliente)[0],
        negativeRecord: negativeRecord.filter(j => i.IdEstadoRegistroNegativo === j.IdEstadoRegistroNegativo)[0]
      }
    })

    setTableData(newTableData.map(el => ({
      IdRegistroNegativo: el.IdRegistroNegativo,
      IdCliente: el.IdCliente,
      IdEstadoRegistroNegativo: el.IdEstadoRegistroNegativo,
      cedula: el.clientData.Cedula,
      name: el.clientData.Nombre,
      lastName: el.clientData.Apellido,
      description: el.negativeRecord.Descripcion,
      createdAt: el.negativeRecord.createdAt,
    })))
  }

  const handleGet = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}`);
      const data = await response.json();
      setForm(data);
      return data
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
        label: element.Cedula + " " + element.IdCliente, //lo que se ve en el selector
      }));
      setOptionsCliente(newOptions);
      return data
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetEstadoRegistroNegativo = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/StatusRegisterNegative`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdEstadoRegistroNegativo, //lo que selecciona en el back
        label: element.Descripcion + " " + element.IdEstadoRegistroNegativo, //lo que se ve en el selector
      }));
      setOptionsRegistroNegativo(newOptions);
      return data
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    try {
      const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
        method: "DELETE",
      });
      setTableData((prev) =>
        prev.filter((info) => info.IdRegistroNegativo != id)
      );
      setDeleted(true);
      if (selected && selected.IdRegistroNegativo == id) {
        setSelected(null);
        setNews({
          IdRegistroNegativo: "",
          IdCliente: "",
          IdEstadoRegistroNegativo: "",
        });
      }
    } catch (error) {
      console.log(error);
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

  const handleEdit = async ({
    IdRegistroNegativo,
    IdCliente,
    IdEstadoRegistroNegativo,
  }) => {
    setSelected({
      IdRegistroNegativo,
      IdCliente,
      IdEstadoRegistroNegativo,
    });
    setNews({
      IdRegistroNegativo: IdRegistroNegativo,
      IdCliente: IdCliente,
      IdEstadoRegistroNegativo: IdEstadoRegistroNegativo,
    });
  };

  const sendNegativeRecord = async (emailData) => {
    try {
      const response = await fetch(`${URL}${PORT}/${EMAILFORM}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log("Ha ocurrido un error al enviar el email.", error);
    }
  }

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
      const newTableRow = getTableRowById(data)
      setTableData((prev) => [...prev, newTableRow]);
      setNews({
        IdRegistroNegativo: "",
        IdCliente: "",
        IdEstadoRegistroNegativo: "",
      });
      return newTableRow
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
      `${URL}${PORT}/${form}/${selected.IdRegistroNegativo}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdRegistroNegativo: news.IdRegistroNegativo,
          IdCliente: news.IdCliente,
          IdEstadoRegistroNegativo: news.IdEstadoRegistroNegativo,
        }),
      }
    );
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) =>
        estado.IdRegistroNegativo == data.IdRegistroNegativo ? data : estado
      )
    );
    setSelected(null);
    setNews({
      IdRegistroNegativo: "",
      IdCliente: "",
      IdEstadoRegistroNegativo: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {

      if (window.confirm("¿Estás seguro de que quieres actualizar este?")) {
        try {
          handleUpdate();
        } catch (error) {
          console.error("Error al actualizar:", error);
        }
      }

    } else {
      try {
        if (tableData?.filter(el => el.IdCliente === parseInt(news.IdCliente)).length > 0) {
          alert("No esta permitido reportar un usuario mas de una vez.");
        } else {
          const data = await handleCreate();
          const respuesta = await sendNegativeRecord(data)
        }
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


  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="registro negativo" size="h6" />
            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por "}
            />
          </div>
        </div>
        <Row>
          <Col>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">

                <SelectCataComponente
                  required
                  label={"- Seleccionar cliente -"}
                  name={"IdCliente"}
                  value={news.IdCliente}
                  options={optionsCliente}
                  onChange={handleSelect}
                />
                <SelectCataComponente
                  required
                  label={"- Seleccionar estado registro negativo-"}
                  name={"IdEstadoRegistroNegativo"}
                  value={news.IdEstadoRegistroNegativo}
                  options={optionsRegistroNegativo}
                  onChange={handleSelect}
                />

                <ButtonCataComponente
                  type="submit"
                  className="btn btn-primary btn-block"
                  title="Guardar"
                />
              </div>
            </form>
          </Col>
          <Col>
            {tableData &&
              <Table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Cedula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Reporte</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.filter(el => el.cedula.includes(filter)).map(el =>
                    <tr key={el.IdRegistroNegativo}>
                      <td>{el.createdAt}</td>
                      <td>{el.cedula}</td>
                      <td>{el.name}</td>
                      <td>{el.lastName}</td>
                      <td>{el.description}</td>
                      <td>
                        <Button variant="warning" onClick={() => handleEdit(el)}>Editar</Button>
                        <Button variant="danger" onClick={() => handleDelete(el.IdRegistroNegativo)}>Eliminar</Button>
                      </td>
                    </tr>)}
                </tbody>
              </Table>
            }
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NegativeRecord;
