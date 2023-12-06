import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";


const PuchaseAccesoriesOrder= () => {
    const [forms, setForm] = useState([]);
    const [news, setNews] = useState({
        // IdAccesorioOrdenCompra
        cantidad: "",
        IdOrdenCompra:"",
        IdAccesorio:""
    });
    const [selected, setSelected] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [deletedM, setDeletedM] = useState(false);
    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [filter, setFilter] = useState("")

    const PerPage = 10;
    const form = "PuchaseAccesoriesOrder";

    const URL = "http://localhost:";
    const PORT = "3003";

    useEffect(() => {
        handleGet();
        handleGetOrdenCompra();
        handleGetAccesorios();
      }, [selected]);
    
      useEffect(() => {
        handleGet();
        handleGetOrdenCompra();
        handleGetAccesorios();
        setDeleted(false);
      }, [deleted]);
    
      useEffect(() => {
        handleGet();
        handleGetOrdenCompra();
        handleGetAccesorios();
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
            label: element.FechaCompra+' - '+element.IdOrdenCompra //lo que se ve en el selector
          }));
          setOptions2(newOptions);
        } catch (error) {
          console.log(error);
        }
      };
      const handleGetAccesorios = async () => {
        try {
          const response = await fetch(`${URL}${PORT}/accesories`);
          const data = await response.json();
          const newOptions = data.map((element) => ({
            value: element.IdAccesorio, //lo que selecciona en el back
            label: element.Descripcion+' - '+element.IdAccesorio //lo que se ve en el selector
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
              setForm((prev) => prev.filter((info) => info.IdAccesorioOrdenCompra != id));
              setDeleted(true);
              if (selected && selected.IdAccesorioOrdenCompra == id) {
                setSelected(null);
                setNews({
                  IdAccesorioOrdenCompra: "",
                  cantidad: "",
                 IdOrdenCompra:"",
                 IdAccesorio:""
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
            IdAccesorioOrdenCompra: news.IdAccesorioOrdenCompra,
            cantidad: news.cantidad,
            IdOrdenCompra:news.IdOrdenCompra,
            IdAccesorio: news.IdAccesorio      
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
            IdAccesorioOrdenCompra: "",
                  cantidad: "",
                 IdOrdenCompra:"",
                 IdAccesorio:""
           
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
          `${URL}${PORT}/${form}/${selected.IdAccesorioOrdenCompra}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cantidad: news.cantidad,
                IdOrdenCompra:news.IdOrdenCompra,
                IdAccesorio: news.IdAccesorio   
            }),
          }
        );
        const data = await response.json();
        setForm((prev) =>
          prev.map((estado) =>
            estado.IdAccesorioOrdenCompra == data.IdAccesorioOrdenCompra ? data : estado
          )
        );
        setSelected(null);
        setNews({
            IdAccesorioOrdenCompra: "",
            cantidad: "",
           IdOrdenCompra:"",
           IdAccesorio:""
            
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
      const current = forms.filter((item) => item.IdOrdenCompra.toString().toLowerCase().includes(filter.toString().toLowerCase())).slice(indexOfFirst, indexOfLast);


      return (
        <>
        <div className="container mt-4">
         <div className="row">
           <div className="col">
             <TitleCataComponente title="Accesorios Orden Compra" size="h6" />
             <SearchCataComponente 
               value={filter}
               onChange={handleInputSearch}
               type={"search"}
               name={"filter"}
               id={"filter"}
               placeholder={"Filtrar accesorio orden compra"} //no es necesario 
             />
           </div>
         </div>
         <div className="row">
           <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
             <form onSubmit={handleSubmit} className="mb-4">
               <div className="form-row"> 

        <InputCataComponente
        value={news.cantidad}
        onChange={handleInput}
        placeholder={"Ingrese cantidad"}
        id={"cantidad"}
        type={"number"}
        name={"cantidad"}
        label={"cantidad"}
      />     
     
           
      <           SelectCataComponente
                  required
                  label={"- Seleccionar orden de compra"}
                  name={"IdOrdenCompra"}
                  value={news.IdOrdenCompra}
                  options={options2}
                  onChange={handleSelect}
                />


              <SelectCataComponente
                  required
                  label={" Seleccionar un Accesorio -"}
                  name={"IdAccesorio"}
                  value={news.IdAccesorio}
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
               idField={"IdAccesorioOrdenCompra"}
               Fields={[
                "cantidad",
                "IdOrdenCompra",
                "IdAccesorio"
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

export default PuchaseAccesoriesOrder;