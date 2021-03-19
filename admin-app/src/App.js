import React, {Component} from "react";
import Header from './components/header/Header';
import SideMenu from './components/side-menu/SideMenu';
import DataCardsSmallContainer from './components/cards/data-card-small/DataCardsSmallContainer'
import DataCardShops from './components/cards/data-card-shops/DataCardShops';
import DataCardLastProduct from './components/cards/data-card-last-product/DataCardLastProduct';
import DataCardTypes from './components/cards/data-card-types/DataCardTypes';
import DataCardCategories from './components/cards/data-card-categories/DataCardCategories';
import ProductsTable from './components/tables/products-table/ProductsTable';
import Footer from './components/footer/Footer';
class App extends Component {
  
  render() {
    return (
      <div id="wrapper">
        <SideMenu />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">

              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">ArtisKaken Dashboard</h1>
              </div>
              <DataCardsSmallContainer />
              <div className="row">
                <div className="col-lg-6 mb-4">	
                  <DataCardShops />
                  <DataCardLastProduct />
                </div>
                <div className="col-lg-6 mb-4">	
                  <DataCardTypes />
                  <DataCardCategories />
                </div>
              </div>
              <h1 className="h3 mb-2 text-gray-800">Productos Publicados</h1>
              <ProductsTable />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}


export default App;
