import React, { Component } from "react";

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
            Img: "",
            Name: "",
            Rating: "",
            Fecha: "",
            Duracion: "",
            Sinopsis: "",
            Genero: ""
        }
    }

    componentDidMount(){
        fetch("https://api.themoviedb.org/3/" + this.props.tipo + "/" + this.props.id + "?api_key=72a023a2665eca4e7abeca593a5c2e2a")
        .then(response => response.json())
        .then(data => this.setState({
            Img: data.poster_path,
            Name: data.title ? data.title : data.name,
            Rating: data.vote_average,
            Fecha: data.release_date ? data.release_date : data.first_air_date,
            Duracion: data.runtime,
            Sinopsis: data.overview,
        }))
        .catch(error => console.log(error))
    }

    render(){

        let duracion = ""

        if(this.props.tipo == "movie"){
            return(
            <section className="row">
                <img className='col-md-6'src={"https://image.tmdb.org/t/p/w342" + this.state.Img} alt={this.state.Name}/>
                <h2 className="alert alert-primary">{this.state.Name}</h2>
                <p className="mt-0 mb-0">Calificación: {this.state.Rating}</p>
                <p className="mt-0 mb-0">Fecha: {this.state.Fecha}</p>
                <p className="mt-0 mb-0"> Duración: {this.state.Duracion} minutos</p>
                <p className="mt-0 mb-0">Sinopsis: {this.state.Sinopsis}</p>
                <p className="mt-0 mb-0">Género: {this.state.Genero}</p>
                <button>Agregar a favoritos</button>
            </section>
            )

        }
        else{
            return(
            <section className="row">
                <img className='col-md-6'src={"https://image.tmdb.org/t/p/w342" + this.state.Img} alt={this.state.Name}/>
                <h2 className="alert alert-warning">{this.state.Name}</h2>
                <p className="mt-0 mb-0">Calificación: {this.state.Rating}</p>
                <p className="mt-0 mb-0">Fecha: {this.state.Fecha}</p>
                <p className="mt-0 mb-0">Sinopsis: {this.state.Sinopsis}</p>
                <p className="mt-0 mb-0">Género: {this.state.Genero}</p>
                <button>Agregar a favoritos</button>

            </section>
            )

        }
    }
}

export default UnDetalle;