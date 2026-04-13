import React, {Component} from "react";
import { Link } from "react-router-dom";
import Elemento from "../Movie/Movie";
class Cartel extends Component{
    constructor(props){
        super(props)
        this.state = {
            datosC: [],
            pagina: 1,
            filtro: ""
        }
    }
componentDidMount(){
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=72a023a2665eca4e7abeca593a5c2e2a")
    .then(response => response.json())
        .then(data => {
      console.log(data.results)
      this.setState({ datosC: data.results})
    })
    .catch( error => console.log(error))
}
controlarInput(event){
    this.setState({
        filtro: event.target.value
    })
}
cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=72a023a2665eca4e7abeca593a5c2e2a&page=${this.state.pagina}`)
        .then(response => response.json())
            .then(data => {
                this.setState({
                    datosC: this.state.datosC.concat(data.results), 
                    pagina: this.state.pagina + 1 
                });
            })
            .catch(error => console.log(error));
    }

render(){
    return(
        
        <div>
            <h2 className="alert alert-primary">Todas las películas</h2>
        <form className="filter-form px-0 mb-3" action="" method="get">
            <input type="text" name="filter" id="" onChange={(event) => this.controlarInput(event)}></input>
        </form>
          <section className="row cards">
                    { this.state.datosC.map( (pelicula, idx) => <Elemento datos={pelicula} key={pelicula.id} tipo={"movie"}/>)}
            </section>
            <button className="btn alert-primary" onClick={() => this.cargarMas()}>
            Cargar más
            </button>
        </div>
    )}}
    export default Cartel;