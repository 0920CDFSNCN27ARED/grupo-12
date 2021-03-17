import React, {Component} from "react";
import HeaderFooTable from './HeaderFooTable';
import ProductTable from './ProductTable';

class ProductsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            productsData: [
                {
                    name: 'N/D',
                    description: 'N/D',
                    price: 0,
                    category: 'N/D',
                    type: 'N/D',
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
        console.log(productsData)
        
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
                                                description={product.description}
                                                price={product.price}
                                                category={product.categoryId}
                                                type={product.typeId}
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