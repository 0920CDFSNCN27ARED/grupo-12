import React from 'react';
import Header from './components/header/Header';
import SideMenu from './components/side-menu/SideMenu';
import DataCardSmall from './components/cards/data-card-small/DataCardSmall'
import DataCard from './components/cards/data-card/DataCard';
import DataCardCategories from './components/cards/data-card-categories/DataCardCategories';
import Footer from './components/footer/Footer';
import {Component} from "react";



  class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        smallCardData: [
          {
            id: 1,
            title: 'Titulo 1',
            value: 123,
            icon: 'fa-clipboard-list'
          },
          {
            id: 2,
            title: 'Titulo 2',
            color: 'danger',
            value: 679.45,
            icon: 'fa-clipboard-list'
          },
          {
            id: 3,
            title: 'Titulo 3',
            color: 'warning',
            value: 456,
            icon: 'fa-clipboard-list'
          },
        ],
      };
    };

    const productCount = async () => {
        const response = await fetch("http://localhost:3000/api/products/count");
        const responseCount = await response.json();
        return responseCount;
    };

    async componentDidMount() {

      const responseCount = await productCount();
      

      const smallCardData = [
          {
            id: 1,
            title: 'Titulo 1',
            value: responseCount.count.toString(),
            icon: 'fa-clipboard-list'
          },
          {
            id: 2,
            title: 'Titulo 2',
            color: 'danger',
            value: 679.45,
            icon: 'fa-clipboard-list'
          },
          {
            id: 3,
            title: 'Titulo 3',
            color: 'warning',
            value: 456,
            icon: 'fa-clipboard-list'
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

              </div>
            </div>
            <Footer />
          </div>
        </div>
      );
    }
}


export default App;
