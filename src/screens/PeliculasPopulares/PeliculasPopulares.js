import React, {useState, useEffect } from "react";
import Elemento from "../../components/Movie/Movie";
import Loading from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";

function Populares(props){

    const [datosP, setDatosP] = useState([]);
    const [datosCopia, setDatosCopia] = useState([]);
    const [pagina, setPagina] = useState(2);
    const [filtro, setFiltro] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=72a023a2665eca4e7abeca593a5c2e2a')
        .then(response => response.json())
        .then(data => {
            console.log(data.results)
            setDatosP(data.results);
            setDatosCopia(data.results);
            setLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    function enviarFormulario(event){
        event.preventDefault()
    } 

    function controlarInput(event){
        setFiltro(event.target.value);
        filtrar();
    }

    function filtrar(){
        setDatosCopia(
            datosP.filter(movie => movie.original_title.toLowerCase().includes(filtro.toLowerCase()))
        );
    }

    function cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=72a023a2665eca4e7abeca593a5c2e2a&page=${pagina}`)
        .then(response => response.json())
        .then(data => {
            setDatosP(datosP.concat(data.results));
            setDatosCopia(datosCopia.concat(data.results));
            setPagina(pagina + 1);
        })
        .catch(error => console.log(error));
    }

    if(loading){
        return <Loading/>
    }

    return(
        <div>
            <h1>UdeSA Movies</h1>
            <Header/> 
            <h2 className="alert alert-primary">Todas las películas Populares</h2>

            <form className="filter-form px-0 mb-3" onSubmit={(event)=> enviarFormulario(event)}>
                <input type="text" name="filter" onChange={(event) => controlarInput(event)}/>
                <button className="btn btn-success btn-sm" type="submit">Enviar</button>
            </form>

            <section className="row cards">
                { datosCopia.map((pelicula, idx ) => 
                    <Elemento datos={pelicula} key={pelicula.id} tipo={"movie"}/>
                )}
            </section>

            <button className="btn btn-primary" onClick={() => cargarMas()}>
                Cargar más
            </button>
        </div>
    )
}

export default Populares;