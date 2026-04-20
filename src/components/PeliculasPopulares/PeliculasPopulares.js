import React, {Component} from "react";
import Elemento from "../Movie/Movie";
import Loading from "../Loader/Loader";
import Header from "../Header/Header";

class Populares extends Component{
    constructor(props){
        super(props)
        this.state = {
            datosP: [],
            datosCopia: [],
            pagina: 2,
            filtro: "",
            loading: true
        }
    }
componentDidMount(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=72a023a2665eca4e7abeca593a5c2e2a')
    .then(response => response.json())
        .then(data => {
      console.log(data.results)
      this.setState({ 
        datosP: data.results,
        datosCopia: data.results,
        loading: false
    })
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
        datosCopia:this.state.datosP.filter(movie => movie.original_title.toLowerCase().includes(this.state.filtro.toLowerCase()))
    })
}
cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=72a023a2665eca4e7abeca593a5c2e2a&page=${this.state.pagina}`)
        .then(response => response.json())
            .then(data => {
                this.setState({
                    datosP: this.state.datosP.concat(data.results), 
                    datosCopia: this.state.datosCopia.concat(data.results),
                    pagina: this.state.pagina + 1 
                });
            })
            .catch(error => console.log(error));
    }

render(){
    if(this.state.loading){
            return <Loading/>
        }
    return(
        <div>
        <h1>UdeSA Movies</h1>
            <Header/> 
            <h2 className="alert alert-primary">Todas las películas Populares</h2>
        <form className="filter-form px-0 mb-3" onSubmit={(event)=> this.enviarFormulario(event)}>
            <input type="text" name="filter" id="" onChange={(event) => this.controlarInput(event)}/>
            <button className="btn btn-success btn-sm" type="submit">Enviar</button>
        </form>
          <section className="row cards">
                    { this.state.datosCopia.map( (pelicula, idx ) => <Elemento datos={pelicula} key={pelicula.id} tipo={"movie"}/>)}
            </section>
            <button className="btn btn-primary" onClick={() => this.cargarMas()}>
            Cargar más
            </button>
        </div>
    )}}
    export default Populares;
