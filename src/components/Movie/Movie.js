import React, {Component} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "universal-cookie";

const cookies = new Cookies()

class Elemento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.datos.id,
            img: props.datos.poster_path,
            name: props.datos.original_title ? props.datos.original_title : props.datos.name,
            descripcion: props.datos.overview,
            tipo: props.tipo,
            verDescripcion: false,
            esFavorito: false
        };
    }

    componentDidMount() {
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
                if (array[i] === this.props.datos.id) {
                    this.setState({
                        esFavorito: true
                    });
                }
            }
        }
    }

    verDescripcion() {
        this.setState({
            verDescripcion: !this.state.verDescripcion
        });
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
            if (arrayFavoritos[i] === this.props.datos.id) {
                existe = true;
            }
        }

        if (existe === false) {
            arrayFavoritos.push(this.props.datos.id);

            localStorage.setItem(clave, JSON.stringify(arrayFavoritos));

            this.setState({
                esFavorito: true
            });
        } else {
            let nuevoArray = [];

            for (let i = 0; i < arrayFavoritos.length; i++) {
                if (arrayFavoritos[i] !== this.props.datos.id) {
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
        return(
        <article className="single-card-movie">
            <img src={"https://image.tmdb.org/t/p/w342" + this.props.datos.poster_path} alt="imagen" className="card-img-top"/>
            <div className="cardBody">
                <h5 className="card-title">{this.state.name} </h5>
                <button className="btn btn-primary" onClick={() => this.verDescripcion()}>
                    {this.state.verDescripcion ? "Ocultar descripcion" : "Ver descripcion"}
                </button>
                <section className={this.state.verDescripcion ? "show" : "hide"}>
                <p className="card-text">Descripcion: {this.state.descripcion}</p>
                </section>
                <Link to={"/UnDetalle/" + this.props.tipo + "/" + this.props.datos.id}>
                <button className="btn btn-primary" >Ir a detalle</button> 
                </Link>
                <section className={cookies.get("usuarioLogueado") ? "show" : "hide"}>
                    <button className="btn btn-primary"onClick={() => this.manejarFavoritos()}>
                        {this.state.esFavorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                    </button>
                </section>
            </div>
        </article>
        )
    }
}


export default Elemento