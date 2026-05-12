import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "universal-cookie";

const cookies = new Cookies()

function Elemento(props) {

    const [id] = useState(props.datos.id);
    const [img] = useState(props.datos.poster_path);
    const [name] = useState(props.datos.original_title ? props.datos.original_title : props.datos.name);
    const [descripcion] = useState(props.datos.overview);
    const [tipo] = useState(props.tipo);
    const [verDescripcion, setVerDescripcion] = useState(false);
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        let clave = "";

        if (props.tipo === "movie") {
            clave = "favoritosPeliculas";
        } else {
            clave = "favoritosSeries";
        }

        let storage = localStorage.getItem(clave);

        if (storage != null) {
            let array = JSON.parse(storage);

            for (let i = 0; i < array.length; i++) {
                if (array[i] == props.datos.id) {
                    setEsFavorito(true);
                }
            }
        }
    }, []);

    function verDescripcionFunc() {
        setVerDescripcion(!verDescripcion);
    }

    function manejarFavoritos() {
        let clave = "";

        if (props.tipo === "movie") {
            clave = "favoritosPeliculas";
        } else {
            clave = "favoritosSeries";
        }

        let storage = localStorage.getItem(clave);
        let arrayFavoritos = [];

        if (storage !== null) {
            arrayFavoritos = JSON.parse(storage);
        }

        let existe = false;

        for (let i = 0; i < arrayFavoritos.length; i++) {
            if (arrayFavoritos[i] == props.datos.id) {
                existe = true;
            }
        }

        if (existe === false) {
            arrayFavoritos.push(props.datos.id);

            localStorage.setItem(clave, JSON.stringify(arrayFavoritos));

            setEsFavorito(true);
        } else {
            let nuevoArray = [];

            for (let i = 0; i < arrayFavoritos.length; i++) {
                if (arrayFavoritos[i] !== props.datos.id) {
                    nuevoArray.push(arrayFavoritos[i]);
                }
            }

            localStorage.setItem(clave, JSON.stringify(nuevoArray));

            setEsFavorito(false);
        }
    }

    return(
        <article className="single-card-movie">
            <img src={"https://image.tmdb.org/t/p/w342" + props.datos.poster_path} alt="imagen" className="card-img-top"/>
            <div className="cardBody">
                <h5 className="card-title">{name} </h5>
                <button className="btn btn-primary" onClick={() => verDescripcionFunc()}>
                    {verDescripcion ? "Ocultar descripcion" : "Ver descripcion"}
                </button>
                <section className={verDescripcion ? "show" : "hide"}>
                    <p className="card-text">Descripcion: {descripcion}</p>
                </section>
                <Link to={"/UnDetalle/" + props.tipo + "/" + props.datos.id}>
                    <button className="btn btn-primary">Ir a detalle</button> 
                </Link>
                <section className={cookies.get("usuarioLogueado") ? "show" : "hide"}>
                    <button className="btn btn-primary" onClick={() => manejarFavoritos()}>
                        {esFavorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                    </button>
                </section>
            </div>
        </article>
    )
}

export default Elemento;