import React, {Component} from "react";
import { Link } from "react-router-dom";
import Elemento from "../Movie/Movie";
class Cartel extends Component{
    constructor(props){
        super(props)
        this.state = {
            datosC: [],
            datosCopia: [],
            pagina: 2,
            filtro: ""
        }
    }
componentDidMount(){
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=72a023a2665eca4e7abeca593a5c2e2a")
    .then(response => response.json())
        .then(data => {
      console.log(data.results)
      this.setState({ datosC: data.results, datosCopia: data.results})
    })
    .catch( error => console.log(error))
}
 enviarFormulario(event){
        event.preventDefault()
    } 
controlarInput(event){
    this.setState({
        filtro: event.target.value
    }, this.filtrar())
}
filtrar(){
    this.setState({
        datosCopia:this.state.datosC.filter(movie => movie.original_title.toLowerCase().includes(this.state.filtro.toLowerCase()))
    })
}
cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=72a023a2665eca4e7abeca593a5c2e2a&page=${this.state.pagina}`)
        .then(response => response.json())
            .then(data => {
                this.setState({
                    datosC: this.state.datosC.concat(data.results), 
                    datosCopia: this.state.datosCopia.concat(data.results),
                    pagina: this.state.pagina + 1 
                });
            })
            .catch(error => console.log(error));
    }

render(){
    return(
        
        <div>
            <h2 className="alert alert-primary">Todas las películas</h2>
        <form className="filter-form px-0 mb-3" onSubmit={(event)=> this.enviarFormulario(event)}>
            <input type="text" name="filter" id="" onChange={(event) => this.controlarInput(event)}/>
            <button className="btn btn-success btn-sm" type="submit">Enviar</button>
        </form>
          <section className="row cards">
                    { this.state.datosCopia.map( (pelicula, idx) => <Elemento datos={pelicula} key={pelicula.id} tipo={"movie"}/>)}
            </section>
            <button className="btn alert-primary" onClick={() => this.cargarMas()}>
            Cargar más
            </button>
        </div>
    )}}
    export default Cartel;