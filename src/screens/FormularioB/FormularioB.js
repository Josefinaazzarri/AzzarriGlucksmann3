import { useState } from "react";
import { withRouter } from "react-router-dom";

function FormularioB(props) {

    const [value, setValue] = useState("");
    const [tipo, setTipo] = useState("movie");

    function enviarFormulario(event){
        event.preventDefault()
        props.history.push("/ResultadosDeBusqueda/"+ tipo + "/" + value)
    }

    function controlarCambios(event){
        setValue(event.target.value)
    }

    function cambiarTipo(nuevoTipo){
        setTipo(nuevoTipo)
    }

    return(
        <form className="search-form nav" onSubmit={(event)=> enviarFormulario(event)}>
            <div className="btn-group mb-2">
                <button 
                    type="button" 
                    className={tipo === "movie" ? "btn btn-primary" : "btn btn-outline-primary"}
                    onClick={() => cambiarTipo("movie")}
                >Películas</button>

                <button 
                    type="button" 
                    className={tipo === "tv" ? "btn btn-primary" : "btn btn-outline-primary"}
                    onClick={() => cambiarTipo("tv")}
                >Series</button>
            </div>

            <input className="navbar" type="text" onChange={(event)=> controlarCambios(event)}/>
            
            <button className="btn btn-success btn-sm" type="submit">Enviar</button>
        </form>
    )
}

export default withRouter(FormularioB)
