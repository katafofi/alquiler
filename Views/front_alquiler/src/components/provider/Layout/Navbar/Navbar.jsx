import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarCataComponente = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to={'/'} className='navbar-brand'>
                        Alquileres
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={handleNavToggle}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id='navbar-nav'>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/employe'}>empleado</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/expense/employe'}>gastos del empleado</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/status/employe'}>estados del empleado</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/categorys'}>categoria</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/clients'}>clientes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/status/pay'}>estado pago</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/status/register/negative'}>estado Registro Negativo</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/sizes'}>Tallas</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/payment/type'}>Tipos de pago</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/accesories'}>accesorios</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/store'}>Tienda</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/puchase/accesories/order'}>Orden compra Accesorios</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/puchase/order'}>Orden compra </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/accesories/inventory'}>Invetario Accesorios </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/Colors'}>colores </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/item/inventory'}>invetario articulos </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/item'}> articulos </Link>
                            </li>    
                            <li className="nav-item">
                                <Link to={'/negative/record'}> registro negativo </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/payments'}> pagos </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavbarCataComponente;