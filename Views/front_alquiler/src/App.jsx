import './App.css'
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from 'react-router-dom';
import NavbarCataComponente from './components/provider/Layout/Navbar/Navbar';
import FooterCataComponente from './components/provider/Layout/Footer/Footer';


function App() {
  return (
    <div className='App'>
      <NavbarCataComponente />
      <Outlet />
      {/* <FooterCataComponente /> */}
    </div>
  )
}

export default App
