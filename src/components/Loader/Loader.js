import { Component } from "react";
import Header from "../Header/Header";

function Loading() {
    return(
        <div>
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

export default Loading;