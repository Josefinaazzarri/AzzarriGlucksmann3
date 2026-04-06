import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CrearCuenta from './screens/CrearCuenta/CrearCuenta';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Favoritos from './screens/Favoritos/Favoritos';
import Populares from './components/Populares/Populares';
import Cartel from './components/Cartel/Cartel';
import UnDetalle from './components/UnDetalle/UnDetalle';



function App() {
  return (
    <div>
    <Header/>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/Login" component={Login}/>
        <Route path="/CrearCuenta" component={CrearCuenta}/>
        <Route path="/Favoritos" component={Favoritos}/>
        <Route path="/Populares" component={Populares}/>
        <Route path="/Cartel" component={Cartel}/>
        <Route path="/UnDetalle/:tipo/:id" component={UnDetalle}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;