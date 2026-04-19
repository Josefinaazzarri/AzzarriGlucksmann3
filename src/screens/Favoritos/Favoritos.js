import React, {Component} from "react";
import Elemento from "../../components/Movie/Movie";
import Header from "../../components/Header/Header";


class Favoritos extends Component {
    constructor(props){
      super(props)
      this.state = {
      peliculas: [],
      series: []
    }
  }

  componentDidMount(){
    let storagePeliculas = localStorage.getItem("favoritosPeliculas");
    let storageSeries = localStorage.getItem("favoritosSeries");

    if(storagePeliculas !== null){
      let storagePeliculasParseado = JSON.parse(storagePeliculas);
      let arrayPeliculas = [];

      storagePeliculasParseado.map(id =>
      fetch (`https://api.themoviedb.org/3/movie/${id}?api_key=72a023a2665eca4e7abeca593a5c2e2a⁠`)
        .then(response => response.json())
        .then(data => {
          arrayPeliculas.push(data);
          this.setState({
          peliculas: arrayPeliculas
          });
          })
        .catch(error => console.log(error))
        )
        }

      if(storageSeries !== null){
        let storageSeriesParseado = JSON.parse(storageSeries);
        let arraySeries = [];

        storageSeriesParseado.map(id =>
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=3f1682dada002836e815351506ac3816`)
          .then(response => response.json())
          .then(data => {
          arraySeries.push(data);
          this.setState({
          series: arraySeries
            });
          })
          .catch(error => console.log(error))
          )
        }
    }
render(){
  return(
    <div>
      <h1>UdeSA Movies</h1>
    <Header/>
      <h2>Películas Favoritas</h2>
      <section>
        {this.state.peliculas.length === 0 ? <p>No hay películas favoritas</p> :
        this.state.peliculas.map ((pelicula, idx) => (<Elemento datos={pelicula} key={pelicula.id} tipo={"movie"} />))
        }
      </section>

       <h2>Series Favoritas</h2>
      <section>
      {this.state.series.length === 0 ? <p>No hay series favoritas</p> :
       this.state.series.map ((serie, idx) => (<Elemento datos={serie} key={serie.id} tipo={"tv"} />)

        )
        }
      </section>

     </div>
        )
    }
}

export default Favoritos;