import React, {Component} from "react";
import {Link} from "react-router-dom/cjs/react-router-dom.min";
import Elemento from "../Movie/Movie";
import FormularioB from "../../screens/FormularioB/FormularioB";
import Loading from "../Loader/Loader";

class Grupos extends Component{
    constructor(props){
    super(props)
    this.state = {
        datosPopulares: [],
        datosCartel: [],
        loading: true
    }
};

componentDidMount(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=72a023a2665eca4e7abeca593a5c2e2a')
        .then(response => response.json())
        .then(data => {
      console.log(data.results)
      this.setState({
        datosPopulares: data.results,
        loading: false
      })
    })
    .catch( error => console.log(error))

    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=72a023a2665eca4e7abeca593a5c2e2a")
    .then(res => res.json())
    .then(data => {
      this.setState({
        datosCartel: data.results,
        loading: false 
      })
    })
    .catch( error => console.log(error))
}


render(){
     if(this.state.loading){
            return <Loading/>
        }
    return(
        <div> 
            <FormularioB className="search-form" />
            <h2 className="alert alert-primary">Peliculas mas populares</h2>
            <section className="row cards">
                    { this.state.datosPopulares
                    .filter ((pelicula, idx) => idx < 4)
                    .map ((pelicula, idx) => ( <Elemento datos={pelicula} key={pelicula.id} tipo={"movie"} />) )}
                    <Link to="/Populares">
                    <button className="btn btn-primary">Ver todas</button>
                    </Link>
            </section>
             <h2 className="alert alert-primary">Peliculas en cartel</h2>
             <section className="row cards">
                     { this.state.datosCartel
                    .filter ((pelicula, idx) => idx < 4)
                    .map ((pelicula, idx) => ( <Elemento datos={pelicula} key={pelicula.id} tipo={"movie"} />) )}
                    <Link to="/Cartel">
                    <button className="btn btn-primary">Ver todas</button>
                    </Link>
             </section>
        </div>
    )
}
}

export default Grupos;