import { useState } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies()

function CrearCuenta(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function enviarFormulario(event){
        event.preventDefault()
        let usuario = {
            email: email,
            password: password
        }

        let guardado = cookies.get("usuarios")
        let lista = []
        let puedeGuardar = true

        if(guardado){
            lista = guardado
        }

        for(let i = 0; i < lista.length; i++){
            if(lista[i].email === usuario.email){
                alert("El email ya existe")
                puedeGuardar = false
            }
        }

        if(usuario.password.length < 6){
            alert("Password muy corta")
            puedeGuardar = false
        }

        if(puedeGuardar === true){
            lista.push(usuario)
            cookies.set("usuarios", lista)
            alert("Usuario guardado")
            props.history.push("/Login")
        }
    }

    function controlarEmail(event){
        setEmail(event.target.value)
    }

    function controlarPassword(event){
        setPassword(event.target.value)
    }

    return(
        <div>
            <h1>UdeSA Movies</h1>
            <Header/>
            <div className="col-md-6">
                <h2>Crear Cuenta</h2>
                <form onSubmit={(event)=> enviarFormulario(event)}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" className="form-control" onChange={(event)=> controlarEmail(event)}/>  
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" onChange={(event)=> controlarPassword(event)}/> 
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(CrearCuenta)
