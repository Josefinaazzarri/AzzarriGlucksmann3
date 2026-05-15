import { useState } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies()

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function enviarFormulario(event){
        event.preventDefault()
        let lista = cookies.get("usuarios")
        let usuarioGuardado = false

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].email === email && lista[i].password === password) {
                usuarioGuardado = true;
            }
        }

        if (usuarioGuardado === true) {
            cookies.set("usuarioLogueado", email);
            alert("¡Bienvenido!");
            props.history.push("/");
        } else {
            alert("Credenciales incorrectas");
        }
    }

    return(
        <div>
            <h1>UdeSA Movies</h1>
            <Header/>
            
            <div className="col-md-6">
                <h2>Login</h2>
                <form onSubmit={(event)=> enviarFormulario(event)}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            onChange={(event)=> setEmail(event.target.value)}
                        />  
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            onChange={(event)=> setPassword(event.target.value)}
                        /> 
                    </div>

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Login);