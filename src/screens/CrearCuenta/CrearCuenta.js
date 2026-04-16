import { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()

class CrearCuenta extends Component {
    constructor(props) {
        super(props)
        this.state = {
          email: "",
          password: "",
        }
    }

    enviarFormulario(event){
        event.preventDefault()
        let usuario = {
        email: this.state.email,
        password: this.state.password
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

      if(puedeGuardar == true){
        lista.push(usuario)
        cookies.set("usuarios", lista)
        cookies.set('usuarioLogueado', usuario.email)
        alert("Usuario guardado")
        this.props.history.push("/Login")
      }
    }

    controlarEmail(event){
        this.setState({
            email: event.target.value
        })
    }

    controlarPassword(event){
        this.setState({
            password: event.target.value
        })
    }

    render(){
        return(
          <div className="col-md-6">
            <form onSubmit={(event)=> this.enviarFormulario(event)}>
              <div className="form-group">
                <label>Email:</label>
                <input type="text" className="form-control" onChange={(event)=> this.controlarEmail(event)}/>  
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control" onChange={(event)=> this.controlarPassword(event)}/> 
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        )
    }
}

export default withRouter(CrearCuenta)
