import React, { useState} from 'react';

const TabletCataComponente = ({
    data,
    handleDelete,
    handleEdit,
    idField,
    Fields,
    handleDeleteM,
  }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemSelect = (itemId) => {
      if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter((id) => id != itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
    };
  
    const handleDeleteSelected = () => {
    handleDeleteM(selectedItems);
      setSelectedItems([]);
    };
  
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedItems.length == data.length}
                  onChange={() => {
                    if (selectedItems.length == data.length) {
                      setSelectedItems([]);
                    } else {
                      setSelectedItems(data.map((provider) => provider[idField]));
                    }
                  }}
                />
              </th>
              {Fields.map((e) => (
                <th>{e}</th>
              ))}
              <th style={{ width: "100%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((provider) => (
              <tr key={provider[idField]}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(provider[idField])}
                    onChange={() => handleItemSelect(provider[idField])}
                  />
                </td>
                {Fields.map((e) => (
                <td>
                  { e == 'IdEstadoEmpleado' ? provider[e] == 1
                    ? <p style={{backgroundColor: 'green', Color: 'white'}}>Activo</p>
                    : provider[e] == 2
                    ?  <p style={{backgroundColor: 'red', Color: 'white'}}>Inactivo</p>
                    : provider[e] : provider[e]}
                    
                </td>
              ))}
                <td>
                  
                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(provider)}
                    >
                      update
                    </button>
                 
                  &nbsp;
                 
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(provider[idField])}
                    >
                      Delete
                    </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedItems.length > 0 && (
          <div>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={handleDeleteSelected}
            >
              Delete Multiple
            </button>
          </div>
        )}
      </div>
    );
  };
  

export default TabletCataComponente;