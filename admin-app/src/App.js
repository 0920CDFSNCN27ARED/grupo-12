import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Products from './components/products/Products';
import CategoriesTypes from './components/categories-types/CategoriesTypes';
import CategoryEdit from "./components/categories-types/CategoryEdit";
import Shops from './components/shops/Shops';
import Users from './components/users/Users';
import Login from './components/auth/Login';
import Header from './components/layout/header/Header';
import SideMenu from './components/layout/side-menu/SideMenu';
import Footer from './components/layout/footer/Footer';
import ProductEdit from "./components/products/ProductEdit";
import ProductDetails from "./components/products/ProductDetails";
class App extends Component {
  
  render() {
    return (
      <div id="wrapper">
        <SideMenu />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <Router>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/productos" component={Products} />
                  <Route path="/productos/detalles/:id" component={ProductDetails} />
                  <Route path="/productos/editar/:id" component={ProductEdit} />
                  <Route exact path="/usuarios" component={Users} />
                  <Route exact path="/comercios" component={Shops} />
                  <Route exact path="/categorias-tipos" component={CategoriesTypes} />
                  <Route path="/categorias/editar/:id" component={CategoryEdit} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </Router>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}


export default App;
