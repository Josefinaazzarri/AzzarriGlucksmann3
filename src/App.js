import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import CrearCuenta from './screens/CrearCuenta/CrearCuenta';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Favoritos from './screens/Favoritos/Favoritos';
import Populares from './screens/PeliculasPopulares/PeliculasPopulares';
import Cartel from './screens/PeliculasCartel/PeliculasCartel';
import UnDetalle from './screens/UnDetalle/UnDetalle';
import FormularioB from './screens/FormularioB/FormularioB';
import ResultadosDeBusqueda from './screens/ResultadosDeBusqueda/ResultadosDeBusqueda';
import NotFound from './screens/NotFound/NotFound';


function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/Login" component={Login}/>
        <Route path="/CrearCuenta" component={CrearCuenta}/>
        <Route path="/Favoritos" component={Favoritos}/>
        <Route path="/Populares" component={Populares}/>
        <Route path="/Cartel" component={Cartel}/>
        <Route path="/UnDetalle/:tipo/:id" component={UnDetalle}/>
        <Route path="/FromularioB" component={FormularioB}/>
        <Route path="/ResultadosDeBusqueda/:tipo/:busqueda" component={ResultadosDeBusqueda}/>
        <Route path="*" component={NotFound}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;