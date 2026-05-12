import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

function Navbar(props){

    const [usuarioLogueado, setUsuarioLogueado] = useState();

    useEffect(() => {
        setUsuarioLogueado(cookies.get("usuarioLogueado"));
    }, []);

    return(
        <div>
            <nav>
            <ul className="nav nav-tabs my-4">
                {
                    props.menu.map((elemento, idx) => 
                    <li key={elemento + idx} className={ elemento.Nombre == "Login" ? (usuarioLogueado == null ? "show" : "hide")
                        : (elemento.Nombre == "Crear Cuenta" ? (usuarioLogueado == null ? "show" : "hide")
                        : (elemento.Nombre == "Favoritos" ? (usuarioLogueado != null ? "show" : "hide")
                        : "show"))}
                    >
            <a className="nav-link"><Link to={elemento.Path}> {elemento.Nombre}</Link></a></li>) }
            </ul>
        </nav>
        </div>
    )
}

export default Navbar;