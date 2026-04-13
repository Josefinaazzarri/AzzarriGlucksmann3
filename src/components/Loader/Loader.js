import { Component } from "react";

class Loading extends Component{
    render(){
        return(
            <div style={{textAlign: "center"}}>
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