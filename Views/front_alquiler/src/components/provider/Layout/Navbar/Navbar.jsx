import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const NavbarCataComponente = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    const dropdownItems = {
        employee: [
            { to: '/employe', label: 'Empleado' },
            { to: '/expense/employe', label: 'Gastos del Empleado' },
        ],
        configuration: [
            { to: '/accesories', label: 'Accesorios' },
            { to: '/status/employe', label: 'Estados del Empleado' },
            { to: '/categorys', label: 'Categoría' },
            { to: '/clients', label: 'Clientes' },
            { to: '/status/pay', label: 'Estado pago' },
            { to: '/sizes', label: 'Tallas' },
            { to: '/store', label: 'Tienda' },
            { to: '/colors', label: 'Colores' },
            { to: '/item', label: 'Artículos' },
            { to: '/negative/record', label: 'Registro negativo' },
            { to: '/status/register/negative', label: 'Estado registro negativo' },
            { to: '/payment/type', label: 'Tipos de pago' },
            { to: '/puchase/order', label: 'Orden compra' },
        ],
        inventory: [
            { to: '/item/inventory', label: 'Inventario de artículos' },
            { to: '/accesories/inventory', label: 'Inventario de accesorios' },
        ],
        rental: [
            { to: '/item/inventory', label: 'Alquileres' },
            { to: '/puchase/accesories/order', label: 'Orden compra accesorios' },
            { to: '/payments', label: 'Pagos' },
        ],
        devolution: [
            { to: '/rentalrefurnt', label: 'Devolucion de alquileres' },
        ]
    };

    const renderDropdownItems = (items) =>
        items.map((item, index) => (
            <NavDropdown.Item key={index} as={Link} to={item.to}>
                {item.label}
            </NavDropdown.Item>
        ));

    const renderNavDropdowns = () =>
        Object.entries(dropdownItems).map(([title, items]) => (
            <NavDropdown key={title} title={title.charAt(0).toUpperCase() + title.slice(1)} id={`${title}-dropdown`}>
                {renderDropdownItems(items)}
            </NavDropdown>
        ));

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand">
                    KADMIEL SMOKING
                </Link>
                <button className="navbar-toggler" type="button" onClick={handleNavToggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbar-nav">
                    <ul className="navbar-nav mr-auto">{renderNavDropdowns()}</ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarCataComponente;
