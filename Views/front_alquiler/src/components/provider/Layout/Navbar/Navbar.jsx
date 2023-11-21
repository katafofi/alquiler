import react, { useState } from 'react';
import { Link } from 'react-router-dom';


const NavbarCataComponente = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen)
    }

    return (<>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link to={'/'} className='navbar-brand'> Alquileres </Link>
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
                </ul>
            </div>
        </div>
    </nav>
    </>)
}

export default NavbarCataComponente