import React, {Component} from "react";
import HeaderFooTable from './elements/HeaderFooTable';
import ProductTable from './elements/ProductTable';

class ProductsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            productsData: [
                {
                    id: 1,
                    avatar: 'without-image.png',
                    name: 'N/D',
                    description: 'N/D',
                    price: 0,
                    categories: {
                        id: 1,
                        name: 'N/D',
                    },
                    types: {
                        id: 1,
                        name: 'N/D',
                    },
                    stock: 0,
                }
            ]
        }
    };

    async allProducts(){
      const response = await fetch(`http://localhost:3000/api/products`);
      const products = await response.json();
      return products.data;
    };

    async componentDidMount(){
        const productsData = await this.allProducts();
        
        this.setState({
          productsData,
        });
    }
    
    render() {
        return (
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <HeaderFooTable
                                    name={'Nombre'}
                                    desc={'Descripción'}
                                    price={'Precio'}
                                    category={'Categoria'}
                                    type={'Tipo'}
                                    stock={'Stock'}
                                />
                            </thead>
                            <tfoot>
                                <HeaderFooTable
                                    name={'Nombre'}
                                    desc={'Descripción'}
                                    price={'Precio'}
                                    category={'Categoria'}
                                    type={'Tipo'}
                                    stock={'Stock'}
                                />
                            </tfoot>
                            <tbody>
                                {
                                    this.state.productsData.map((product) => {
                                        return(
                                            <ProductTable
                                                key={product.id} 
                                                name={product.name}
                                                avatar={product.avatar}
                                                description={product.description}
                                                price={product.price}
                                                category={product.categories.name}
                                                type={product.types.name}
                                                stock={product.stock}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductsTable;