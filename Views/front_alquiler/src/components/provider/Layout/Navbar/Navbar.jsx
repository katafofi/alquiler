import react, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarCataComponente = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen)
    }

    return (<>
    <nav class="navbar navbar-expand-l navbar-dark bg-dark">
        <div class="container">
            <Link to={'/'} className='navbar-brand'> Alquileres </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleNavToggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id='navbar-nav'>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link to={'/employe'}>empleado</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </>)
}

export default NavbarCataComponente