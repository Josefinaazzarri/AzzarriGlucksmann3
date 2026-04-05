import React, {Component} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class Elemento extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: props.datos.id,
            Img: props.datos.poster_path,
            Name: props.datos.original_title,
            Descripcion: props.datos.overview,
            tipo: props.tipo
        }
    }

     verDescripcion(){
        this.setState({
            verDescripcion: !this.state.verDescripcion
        })
    }


    
    render(){
        return(
        <article className="single-card-playing">
            <img src={"https://image.tmdb.org/t/p/w342" + this.props.datos.poster_path} alt="imagen" className="card-img-top"/>
            <div className="cardBody">
                <h5 className="card-title">{this.state.Name} </h5>
                <button className="btn alert-primary" onClick={() => this.verDescripcion()}>
                    {this.state.verDescripcion ? "Ocultar descripcion" : "Ver descripcion"}
                </button>
                <section className={this.state.verDescripcion ? "show" : "hide"}>
                <p className="card-text">Descripcion: {this.state.Descripcion}</p>
                </section>
		        <button className="btn alert-primary" >Agregar a Favoritos</button>
                <Link to={"/UnDetalle/" + this.props.tipo + "/" + this.props.datos.id}>
                <button className="btn alert-primary" >Ir a detalle</button> 
                </Link>
            </div>
        </article>
        )
    }
}


export default Elemento