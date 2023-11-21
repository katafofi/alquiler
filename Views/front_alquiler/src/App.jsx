import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarCataComponente from './components/provider/Layout/Navbar/Navbar';
import FooterCataComponente from './components/provider/Layout/Footer/Footer';
import Employe from './views/Employe';
import ExpenseEmploye from './views/ExpenseEmploye';
import StatusEmploye from './views/StatusEmploye';

function App() {
 return (
  <div className='App'>
    <Router>
        <NavbarCataComponente />
        <div id="main-container">
          <Routes>
            <Route exact path='/employe' element={ <Employe /> }></Route>
            <Route exact path='/expense/employe' element={ <ExpenseEmploye /> }></Route>
            <Route exact path='/status/employe' element={ <StatusEmploye /> }></Route>
          </Routes>
        </div>
        <FooterCataComponente />
    </Router>
  </div>
 )
}

export default App
