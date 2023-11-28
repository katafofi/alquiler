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
import Categorys from './views/Categorys';
import Clients from './views/Clients';
import StatusPay from './views/StatusPay';
import StatusRegisterNegative from './views/StatusRegisterNegative';
import Sizes from './views/Sizes';
import PaymentType from './views/PaymentType';
import Accesories from './views/Accesories';
import Store from './views/Store';
import PuchaseAccesoriesOrder from './views/PuchaseAccesoriesOrder';
import PuchaseOrder from './views/puchaseOrder';
import AccesoriesInventory from './views/accesoriesInventory';








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
            <Route exact path='/categorys' element={ <Categorys />}></Route>
            <Route exact path='/clients' element= { <Clients />}></Route>
           <Route exact path='/status/pay' element= { <StatusPay />}></Route>
           <Route exact path='/status/register/negative' element= { <StatusRegisterNegative />}></Route>
           <Route exact path='/sizes' element= { <Sizes />}></Route>
           <Route exact path='/payment/type' element= { < PaymentType />}></Route>
           <Route exact path='/accesories' element= { < Accesories />}></Route>
           <Route exact path='/store' element= { < Store />}></Route>  
           <Route exact path='/puchase/accesories/order' element={ < PuchaseAccesoriesOrder  />}></Route> 
           <Route exact path='/puchase/order' element= { < PuchaseOrder />}></Route>
           <Route exact path='/accesories/inventory' element= { < AccesoriesInventory />}></Route>
         </Routes>
        </div>
        <FooterCataComponente />
    </Router>
  </div>
 )
}

export default App
