import { Component } from "react";
import Header from "../Header/Header";

class Loading extends Component{
    render(){
        return(
            <div style={{textAlign: "center"}}>
                <h1>UdeSA Movies</h1>
                <Header/>
                <img 
                    src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" 
                    alt="Cargando"
                />
                <h2>Cargando...</h2>
            </div>
        )
    }
}

export default Loading;