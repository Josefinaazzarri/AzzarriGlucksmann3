import React, { useState, useEffect } from "react";
import Elemento from "../../components/Movie/Movie";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";

function Favoritos(props){

  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let storagePeliculas = localStorage.getItem("favoritosPeliculas");
    let storageSeries = localStorage.getItem("favoritosSeries");

    if(storagePeliculas !== null){
      let storagePeliculasDos = JSON.parse(storagePeliculas);
      let arrayPeliculas = [];

      storagePeliculasDos.map(id =>
        fetch (`https://api.themoviedb.org/3/movie/${id}?api_key=72a023a2665eca4e7abeca593a5c2e2a`)
        .then(response => response.json())
        .then(data => {
          arrayPeliculas.push(data);
          setPeliculas(arrayPeliculas);
          setLoading(false);
         })
          .catch(error => console.log(error))
          )
        }

     if(storageSeries !== null){
      let storageSeriesDos = JSON.parse(storageSeries);
      let arraySeries = [];

      storageSeriesDos.map(id =>
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=3f1682dada002836e815351506ac3816`)
        .then(response => response.json())
        .then(data => {
          arraySeries.push(data);
          setSeries(arraySeries);
          setLoading(false);
        })
          .catch(error => console.log(error))
          )
        }
    }, []);

    if(loading){
        return <Loading/>
    }

    return(
        <div>
            <h1>UdeSA Movies</h1>
            <Header/>

            <h2>Películas Favoritas</h2>
            <section className="row cards">
                {peliculas.length === 0 ? <p>No hay películas favoritas</p> :
                    peliculas.map ((pelicula, idx) => (
                        <Elemento datos={pelicula} key={pelicula.id} tipo={"movie"} />
                    ))
                }
            </section>

            <h2>Series Favoritas</h2>
            <section className="row cards">
                {series.length === 0 ? <p>No hay series favoritas</p> :
                    series.map ((serie, idx) => (
                        <Elemento datos={serie} key={serie.id} tipo={"tv"} />
                    ))
                }
            </section>
        </div>
    )
}

export default Favoritos;