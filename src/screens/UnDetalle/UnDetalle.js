import React, { Component } from "react";
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

class Detalle extends Component{
    constructor(props){
        super(props)
        this.state = {
            img: "",
            name: "",
            rating: "",
            fecha: "",
            duracion: "",
            sinopsis: "",
            genero: "",
            loading: true,
            esFavorito: false
        }
    }

    componentDidMount(){
        fetch("https://api.themoviedb.org/3/" + this.props.tipo + "/" + this.props.id + "?api_key=72a023a2665eca4e7abeca593a5c2e2a")
        .then(response => response.json())
        .then(data => this.setState({
            img: data.poster_path,
            name: data.original_title ? data.original_title : data.name,
            rating: data.vote_average,
            fecha: data.release_date ? data.release_date : data.first_air_date,
            duracion: data.runtime,
            sinopsis: data.overview,
            genero: data.genres,
            loading: false
        }))
        .catch(error => console.log(error))


        let clave = "";

        if (this.props.tipo === "movie") {
            clave = "favoritosPeliculas";
        } else {
            clave = "favoritosSeries";
        }

        let storage = localStorage.getItem(clave);

        if (storage !== null) {
        let array = JSON.parse(storage);

        for (let i = 0; i < array.length; i++) {
        if (array[i] == this.props.id) {
            this.setState({
                esFavorito: true
            });
            }
        }
        }
    }
  
    manejarFavoritos() {
        let clave = "";

        if (this.props.tipo === "movie") {
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
            if (arrayFavoritos[i] == this.props.id) {
                existe = true;
            }
        }

        if (existe === false) {
            arrayFavoritos.push(this.props.id);

            localStorage.setItem(clave, JSON.stringify(arrayFavoritos));

            this.setState({
                esFavorito: true
            });
        } else {
            let nuevoArray = [];

            for (let i = 0; i < arrayFavoritos.length; i++) {
                if (arrayFavoritos[i] != this.props.id) {
                nuevoArray.push(arrayFavoritos[i]);
             }
            }

            localStorage.setItem(clave, JSON.stringify(nuevoArray));

            this.setState({
                esFavorito: false
            });
        }
    }

    render(){
        if(this.state.loading){
            return <Loading/>
        }
        
        if(this.props.tipo === "movie"){
            return(
            <div>
                <h1>UdeSA Movies</h1>
                <Header/>
                <section className="row">
                <article className="detalle-img">
                    <img src={"https://image.tmdb.org/t/p/w342" + this.state.img} alt={this.state.name}/>
                </article>
                <article className="col-md-6">
                <h2 className="alert alert-primary">{this.state.name}</h2>
                <p className="mt-0 mb-0">Calificación: {this.state.rating}</p>
                <p className="mt-0 mb-0">Fecha: {this.state.fecha}</p>
                <p className="mt-0 mb-0"> Duración: {this.state.duracion} minutos</p>
                <p className="mt-0 mb-0">Sinopsis: {this.state.sinopsis}</p>
                <p className="mt-0 mb-0">Género: {this.state.genero.map((gen, idx) => gen.name + "  ")}</p>
                <section className={cookies.get("usuarioLogueado") ? "show" : "hide"}>
                    <button className="btn btn-primary"onClick={() => this.manejarFavoritos()}>
                        {this.state.esFavorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                    </button>
                </section>
                </article>
                </section>
            </div>
            )

        }
        else{
            return(
            <div>
                <h1>UdeSA Movies</h1>
                <Header/>
                <section className="row">
                <article className="detalle-img">
                    <img src={"https://image.tmdb.org/t/p/w342" + this.state.img} alt={this.state.name}/>
                </article>
                <article className="col-md-6">
                    <h2 className="alert alert-warning">{this.state.name}</h2>
                    <p className="mt-0 mb-0">Calificación: {this.state.rating}</p>
                    <p className="mt-0 mb-0">Fecha: {this.state.fecha}</p>
                    <p className="mt-0 mb-0">Sinopsis: {this.state.sinopsis}</p>
                    <p className="mt-0 mb-0">Género: {this.state.genero}</p>
                    <section className={cookies.get("usuarioLogueado") ? "show" : "hide"}>
                    <button className="btn btn-primary"onClick={() => this.manejarFavoritos()}>
                        {this.state.esFavorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                    </button>
                    </section>
                 </article>
                </section>
            </div>
            )

        }
    }
}

export default UnDetalle;