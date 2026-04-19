import React from "react";
import Grupos from "../../components/SeccionPeliculas/SeccionPeliculas";
import Header from "../../components/Header/Header";

function Home() {
    return(
        <div>
    <h1>UdeSA Movies</h1>
    <Header/>
        <Grupos/>
    </div>
    )
}

export default Home