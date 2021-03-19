import React, {Component} from "react";
import DataCardSmall from './elements/DataCardSmall'

  class DataCardsSmallContainer extends Component {
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
      const response = await fetch(`http://localhost:3000/api/products/count`);
      const count = await response.json();
      return count.data;
    };

    async shopsCounter(){
      const response = await fetch(`http://localhost:3000/api/shops/count`);
      const count = await response.json();
      return count.data;
    };

    async usersCounter(){
      const response = await fetch(`http://localhost:3000/api/users/count`);
      const count = await response.json();
      return count.data;
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
      );
    }
}


export default DataCardsSmallContainer;
