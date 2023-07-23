import logo from './logo.svg';
import './App.css';
import HostForm from './Components/HostForm';
import HostLogin from './Components/HostLogin';
import { AllRoute } from './Pages/AllRoute';
import { Link } from 'react-router-dom';

import HostNavbar from './Components/HostNavbar';
import GuestNavbar from './Components/GuestNavbar';
import Home from './Components/Home';
import { useState } from 'react';

function App() {
const [location,setLocation]=useState()
  
  return (
    <div className="App">
     {/* <HostNavbar/> */}
     {/* <GuestNavbar/> */}
     <AllRoute/>

     

    </div>
  );
}

export default App;
