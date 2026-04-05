import { Component } from "react";


class FormularioB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }

    enviarFormulario(event){
        event.preventDefault()
        this.props.history.push("/ResultadosDeBusqueda/"+this.state.value)
    }

    controlarCambios(event){
        this.setState({
            value: event.target.value
        })
    }

    render(){
        return(
            <form className="search-form" onSubmit={(event)=> this.enviarFormulario(event)}>
                <input className="" type="text" onChange={(event)=> this.controlarCambios(event)}/>
                <button className="btn btn-success btn-sm" type="submit">Enviar</button>
            </form>
        )
    }
}

export default FormularioB