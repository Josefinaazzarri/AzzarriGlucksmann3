import React, {Component} from "react";
import Elemento from "../Elemento/Elemento";
import FormularioB from "../FormularioB/FormularioB";

class Grupos extends Component{
    constructor(props){
    super(props)
    this.state = {
        datosPopulares: [],
        datosCartel: []
    }
};

componentDidMount(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=72a023a2665eca4e7abeca593a5c2e2a')
        .then(response => response.json())
        .then(data => {
      console.log(data.results)
      this.setState({ datosPopulares: data.results})
    })
    .catch( error => console.log(error))

    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=72a023a2665eca4e7abeca593a5c2e2a")
    .then(res => res.json())
    .then(data => {
      this.setState({ datosCartel: data.results })
    })
    .catch( error => console.log(error))
}


render(){
    return(
        <div> 
            <FormularioB class="search-form" />
            <h2 className="alert alert-primary">Peliculas mas populares</h2>
            <section className="row cards">
                    { this.state.datosPopulares.map( (pelicula, idx ) => <Elemento datos={pelicula} key={pelicula.id}/>)}
                    <button className="btn alert-primary">Ver todas</button>
            </section>
             <h2 className="alert alert-primary">Peliculas en cartel</h2>
             <section className="row cards">
                    {this.state.datosCartel.map  ((pelicula, idx) => <Elemento datos={pelicula} key={pelicula.id}/> )}
                    <button className="btn alert-primary">Ver todas</button>
             </section>
        </div>
    )
}
}

export default Grupos