import { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          email: "",
          password: "",
        }
    }

    enviarFormulario(event){
        event.preventDefault()
      let usuariosGuardados = localStorage.getItem("usuarios")
      let lista = []
    
      if (usuariosGuardados) {
        lista = JSON.parse(usuariosGuardados);
    }

      let usuarioGuardado = false


      for (let i = 0; i < lista.length; i++) {
        if (lista[i].email === this.state.email && lista[i].password === this.state.password) {
            usuarioGuardado = true;
        }
      }

      if (usuarioGuardado === true) {
        localStorage.setItem("usuarioLogueado", this.state.email);
        alert("¡Bienvenido!");
        this.props.history.push("/");
    } else {
        alert("Credenciales incorrectas");
    }
    }
    render(){
        return(
          <div className="col-md-6">
            <h2>Login</h2>
            <form onSubmit={(event)=> this.enviarFormulario(event)}>
              <div className="form-group">
                <label>Email:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={(event)=> this.setState({email: event.target.value})}
                />  
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input 
                    type="password" 
                    className="form-control" 
                    onChange={(event)=> this.setState({password: event.target.value})}
                /> 
              </div>
              <button type="submit">Entrar</button>
            </form>
  
          </div>
        )
    }
}
export default withRouter(Login);