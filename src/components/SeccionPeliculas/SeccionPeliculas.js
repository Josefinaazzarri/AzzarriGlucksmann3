import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom/cjs/react-router-dom.min";
import Elemento from "../Movie/Movie";
import FormularioB from "../../screens/FormularioB/FormularioB";
import Loading from "../Loader/Loader";

function Grupos(props){

    const [datosPopulares, setDatosPopulares] = useState([]);
    const [datosCartel, setDatosCartel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=72a023a2665eca4e7abeca593a5c2e2a')
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                setDatosPopulares(data.results);
                setLoading(false);
            })
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=72a023a2665eca4e7abeca593a5c2e2a")
            .then(res => res.json())
            .then(data => {
                setDatosCartel(data.results);
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, []);

    if(loading){
        return <Loading/>
    }

    return(
        <div> 
            <FormularioB className="search-form" />
            <h2 className="alert alert-primary">Peliculas mas populares</h2>
            <section className="row cards">
                { datosPopulares
                    .filter ((pelicula, idx) => idx < 4)
                    .map ((pelicula, idx) => ( <Elemento datos={pelicula} key={pelicula.id} tipo={"movie"} />) )}
                <Link to="/Populares">
                    <button className="btn btn-primary">Ver todas</button>
                </Link>
            </section>

            <h2 className="alert alert-primary">Peliculas en cartel</h2>
            <section className="row cards">
                { datosCartel
                    .filter ((pelicula, idx) => idx < 4)
                    .map ((pelicula, idx) => ( <Elemento datos={pelicula} key={pelicula.id} tipo={"movie"} />) )}
                <Link to="/Cartel">
                    <button className="btn btn-primary">Ver todas</button>
                </Link>
            </section>
        </div>
    )
}

export default Grupos;