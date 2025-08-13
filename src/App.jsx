import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Dashboard from './pages/Dashboard';
import Menulist from './pages/Menulist';
import Createmenu from './pages/Createmenu';
import Updatemenu from './pages/Updatemenu';
import Order from './pages/Order';
import Updateorder from './pages/Updateorder';
import Customerlist from './pages/Customerlist';
import Createcustomer from './pages/Createcustomer';
import Updatecustomer from './pages/Updatecustomer';
import Staff from './pages/Staff';
import Createstaff from './pages/Createstaff';
import Updatestaff from './pages/Updatestaff';
import Premiummenu from './pages/Premiummenu';
import Createpremium from './pages/Createpremium';
import Updatepremium from './pages/Updatepremium';
import Enquery from './pages/Enquiry';
import Enquiry from './pages/Enquiry';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); 

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} >
                <Route path="/menu" element={< Menulist/>} />
                <Route path="/createmenu" element={< Createmenu/>} />
                <Route path="/updatemenu/:id" element={< Updatemenu/>} />
                <Route path="/order" element={< Order/>} />
                <Route path="/updateorder/:id" element={< Updateorder/>} />
                <Route path="/customer" element={< Customerlist/>} />
                <Route path="/createcustomer" element={< Createcustomer/>} />
                <Route path="/updatecustomer/:id" element={< Updatecustomer/>} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/createstaff" element={< Createstaff/>} />
                <Route path="/updatestaff/:id" element={< Updatestaff/>} />
                <Route path="/premium" element={<Premiummenu />} />
                <Route path="/createpremium" element={<Createpremium />} />
                <Route path="/updatepremium/:id" element={<Updatepremium />} />
                <Route path="/enquiry" element={<Enquiry/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
