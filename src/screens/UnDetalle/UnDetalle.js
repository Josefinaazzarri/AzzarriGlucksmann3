import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import Cookies from "universal-cookie";

const cookies = new Cookies()

function UnDetalle(props){
    const tipo = props.match.params.tipo
    const id = props.match.params.id

    return(
        <Detalle tipo={tipo} id={id}/>
    )
}

function Detalle(props){

    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [fecha, setFecha] = useState("");
    const [duracion, setDuracion] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [genero, setGenero] = useState("");
    const [loading, setLoading] = useState(true);
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/" + props.tipo + "/" + props.id + "?api_key=72a023a2665eca4e7abeca593a5c2e2a")
        .then(response => response.json())
        .then(data => {
            setImg(data.poster_path);
            setName(data.original_title ? data.original_title : data.name);
            setRating(data.vote_average);
            setFecha(data.release_date ? data.release_date : data.first_air_date);
            setDuracion(data.runtime);
            setSinopsis(data.overview);
            setGenero(data.genres);
            setLoading(false);
        })
        .catch(error => console.log(error))

        let clave = "";

        if (props.tipo === "movie") {
            clave = "favoritosPeliculas";
        } else {
            clave = "favoritosSeries";
        }

        let storage = localStorage.getItem(clave);

        if (storage !== null) {
            let array = JSON.parse(storage);

            for (let i = 0; i < array.length; i++) {
                if (array[i] == props.id) {
                    setEsFavorito(true);
                }
            }
        }

    }, []);

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
            if (arrayFavoritos[i] == props.id) {
                existe = true;
            }
        }

        if (existe === false) {
            arrayFavoritos.push(props.id);
            localStorage.setItem(clave, JSON.stringify(arrayFavoritos));
            setEsFavorito(true);
        } else {
            let nuevoArray = [];

            for (let i = 0; i < arrayFavoritos.length; i++) {
                if (arrayFavoritos[i] != props.id) {
                    nuevoArray.push(arrayFavoritos[i]);
                }
            }

            localStorage.setItem(clave, JSON.stringify(nuevoArray));
            setEsFavorito(false);
        }
    }

    if(loading){
        return <Loading/>
    }

    if(props.tipo === "movie"){
        return(
            <div>
                <h1>UdeSA Movies</h1>
                <Header/>
                <section className="row">
                    <article className="detalle-img">
                        <img src={"https://image.tmdb.org/t/p/w342" + img} alt={name}/>
                    </article>
                    <article className="col-md-6">
                        <h2 className="alert alert-primary">{name}</h2>
                        <p>Calificación: {rating}</p>
                        <p>Fecha: {fecha}</p>
                        <p>Duración: {duracion} minutos</p>
                        <p>Sinopsis: {sinopsis}</p>
                        <p>Género: {genero.map((gen, idx) => gen.name + " ")}</p>

                        <section className={cookies.get("usuarioLogueado") ? "show" : "hide"}>
                            <button onClick={() => manejarFavoritos()}>
                                {esFavorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                            </button>
                        </section>
                    </article>
                </section>
            </div>
        )
    } else {
        return(
            <div>
                <h1>UdeSA Movies</h1>
                <Header/>
                <section className="row">
                    <article className="detalle-img">
                        <img src={"https://image.tmdb.org/t/p/w342" + img} alt={name}/>
                    </article>
                    <article className="col-md-6">
                        <h2 className="alert alert-warning">{name}</h2>
                        <p>Calificación: {rating}</p>
                        <p>Fecha: {fecha}</p>
                        <p>Sinopsis: {sinopsis}</p>
                        <p>Género: {genero.map((gen, idx) => gen.name + " ")}</p>

                        <section className={cookies.get("usuarioLogueado") ? "show" : "hide"}>
                            <button onClick={() => manejarFavoritos()}>
                                {esFavorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                            </button>
                        </section>
                    </article>
                </section>
            </div>
        )
    }
}

export default UnDetalle;