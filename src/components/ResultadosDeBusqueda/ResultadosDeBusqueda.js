import { Component } from "react";
import Elemento from "../Movie/Movie";
import Loading from "../Loader/Loader";

class ResultadosDeBusqueda extends Component{
     constructor(props){
        super(props)
        this.state = {
            peliculas: [],
            series: [],
            loading: true
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=72a023a2665eca4e7abeca593a5c2e2a&query=${this.props.match.params.busqueda}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                peliculas: data.results,
                loading: false
            })
    })
        .catch( error => console.log(error))


        fetch(`https://api.themoviedb.org/3/search/tv?api_key=72a023a2665eca4e7abeca593a5c2e2a&query=${this.props.match.params.busqueda}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                series: data.results,
                loading: false
            })
    })
        .catch( error => console.log(error))
    }


    render() {
    if(this.state.loading){
            return <Loading />
        }
    return (
        <div>
            <h2 className="alert alert-primary">Resultados para: "{this.props.match.params.busqueda}"</h2>
            <section className="row cards">
                {this.state.peliculas.map((peli, idx) => { return <Elemento datos={peli} key={peli.id} tipo={"movie"} /> })
                }

                {this.state.series.map((serie, idx) => { return <Elemento datos={serie} key={serie.id} tipo={"tv"} />
                    }
                )}
            </section>
        </div>
       
    );
  }
}

export default ResultadosDeBusqueda;

