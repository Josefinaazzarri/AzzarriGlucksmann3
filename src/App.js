import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CrearCuenta from './screens/CrearCuenta/CrearCuenta';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Favoritos from './screens/Favoritos/Favoritos';
import Populares from './components/PeliculasPopulares/PeliculasPopulares';
import Cartel from './components/PeliculasCartel/PeliculasCartel';
import UnDetalle from './components/UnDetalle/UnDetalle';
import FormularioB from './components/FormularioB/FormularioB';
import ResultadosDeBusqueda from './components/ResultadosDeBusqueda/ResultadosDeBusqueda';
import NotFound from "./components/NotFound/NotFound";


function App() {
  return (
    <div>
    <h1>UdeSA Movies</h1>
    <Header/>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/Login" component={Login}/>
        <Route path="/CrearCuenta" component={CrearCuenta}/>
        <Route path="/Favoritos" component={Favoritos}/>
        <Route path="/Populares" component={Populares}/>
        <Route path="/Cartel" component={Cartel}/>
        <Route path="/UnDetalle/:tipo/:id" component={UnDetalle}/>
        <Route path="/FromularioB" component={FormularioB}/>
        <Route path="/ResultadosDeBusqueda/:busqueda" component={ResultadosDeBusqueda}/>
        <Route path="*" component={NotFound}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;