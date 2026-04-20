import { Component } from "react";
import { withRouter } from "react-router-dom";


class FormularioB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            tipo: "movie"
        }
    }

    enviarFormulario(event){
        event.preventDefault()
        this.props.history.push("/ResultadosDeBusqueda/"+ this.state.tipo + "/" +this.state.value)
    }

    controlarCambios(event){
        this.setState({
            value: event.target.value
        })
    }

    cambiarTipo(nuevoTipo){
        this.setState({
            tipo: nuevoTipo
        })
    }

    render(){
        return(
            <form className="search-form nav" onSubmit={(event)=> this.enviarFormulario(event)}>
                <div className="btn-group mb-2">
                    <button 
                        type="button" 
                        className={this.state.tipo === "movie" ? "btn btn-primary" : "btn btn-outline-primary"}
                        onClick={() => this.cambiarTipo("movie")}
                    >Películas</button>
                    <button 
                        type="button" 
                        className={this.state.tipo === "tv" ? "btn btn-primary" : "btn btn-outline-primary"}
                        onClick={() => this.cambiarTipo("tv")}
                    >Series</button>
                </div>
                <input className="navbar" type="text" onChange={(event)=> this.controlarCambios(event)}/>
                <button className="btn btn-success btn-sm" type="submit">Enviar</button>
            </form>
        )
    }
}

export default withRouter(FormularioB)