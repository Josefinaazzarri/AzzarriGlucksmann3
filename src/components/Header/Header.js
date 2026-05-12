import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';

function Header() {

  const [menu] = useState([
    { Nombre: "Home", Path: "/" },
    { Nombre: "Login", Path: "/Login" },
    { Nombre: "Crear Cuenta", Path: "/CrearCuenta" },
    { Nombre: "Favoritos", Path: "/Favoritos" },
  ]);

  return(
    <div>
      <Navbar menu={menu}/>
    </div>
  )
}


export default Header;