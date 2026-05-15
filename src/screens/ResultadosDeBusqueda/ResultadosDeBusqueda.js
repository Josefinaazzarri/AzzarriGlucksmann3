import { useState, useEffect } from "react";
import Elemento from "../../components/Movie/Movie";
import Loading from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";

function ResultadosDeBusqueda(props){

    const [peliculas, setPeliculas] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/${props.match.params.tipo}?api_key=72a023a2665eca4e7abeca593a5c2e2a&query=${props.match.params.busqueda}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setPeliculas(data.results);
            setLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <h1>UdeSA Movies</h1>
            <Header/>   
            <h2 className="alert alert-primary">
                Resultados para: "{props.match.params.busqueda}"
            </h2>
        <section className="row cards">
            {loading ? <Loading/> :
                (peliculas.length > 0? peliculas.map((peli, idx) => (<Elemento datos={peli} key={peli.id} tipo={props.match.params.tipo}/>)) 
                    : <p>No se encontraron resultados</p>
                    )
                }
            </section>
        </div>
    );
}

export default ResultadosDeBusqueda;