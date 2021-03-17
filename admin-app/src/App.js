import React from 'react';
import Header from './components/header/Header';
import SideMenu from './components/side-menu/SideMenu';
import DataCardSmall from './components/cards/data-card-small/DataCardSmall'
import DataCard from './components/cards/data-card/DataCard';
import DataCardCategories from './components/cards/data-card-categories/DataCardCategories';
import Footer from './components/footer/Footer';
import {Component} from "react";
import ProductsTable from './components/tables/products-table/ProductsTable';



  class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        smallCardData: [
          {
            id: 1,
            title: 'Cantidad de Productos',
            color: 'primary',
            value: 0,
            icon: 'fa-clipboard-list'
          },
          {
            id: 2,
            title: 'Cantidad de Comercios',
            color: 'success',
            value: 0,
            icon: 'fa-store'
          },
          {
            id: 3,
            title: 'Cantidad de Usuarios',
            color: 'warning',
            value: 0,
            icon: 'fa-users'
          },
        ],
      };
    };

    async productsCounter(){
      const response = await fetch(`http://localhost:3000/api/products`);
      const count = await response.json();
      return parseInt(count.meta.totalCount);
    };

    async shopsCounter(){
      const response = await fetch(`http://localhost:3000/api/shops`);
      const count = await response.json();
      return parseInt(count.meta.totalCount);
    };

    async usersCounter(){
      const response = await fetch(`http://localhost:3000/api/users`);
      const count = await response.json();
      return parseInt(count.meta.totalCount);
    };

    async componentDidMount() {

      const productsCounter = await this.productsCounter();
      const usersCounter = await this.usersCounter();
      const shopsCounter = await this.shopsCounter();

      const smallCardData = [
          {
            id: 1,
            title: 'Cantidad de Productos',
            value: productsCounter,
            icon: 'fa-clipboard-list'
          },
          {
            id: 2,
            title: 'Cantidad de Comercios',
            color: 'success',
            value: shopsCounter,
            icon: 'fa-store'
          },
          {
            id: 3,
            title: 'Cantidad de Usuarios',
            color: 'warning',
            value: usersCounter,
            icon: 'fa-users'
          },
        ];

        this.setState({
          smallCardData,
        });
      
    };

    render(){
      
      return (
        <div id="wrapper">
          <SideMenu />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <div className="container-fluid">

                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>

                <div className="row">
                  {
                    this.state.smallCardData.map((element) => {
                      return (
                        <DataCardSmall
                          key={element.id} 
                          title={element.title}
                          color={element.color}
                          value={element.value}
                          icon={element.icon}
                        />
                      )
                    })
                  }
                </div>

                <div className="row">
                  <DataCard />
                  <DataCardCategories />
                </div>
                <h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>
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
