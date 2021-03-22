import React, {Component} from "react";
import HeaderFooTable from './elements/HeaderFooTable';
import ProductTable from './elements/ProductTable';
import SkeletonProducts from '../../../assets/images/skeleton-products.gif'
import * as env from '../../../environment';
const { API_URL } = env[process.env.NODE_ENV];

class ProductsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            totalPages: 0,
            loading:true,
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
                    shops: {
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
        };
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this); 
    };

    async allProducts(){
      const response = await fetch(`${API_URL}/products?page=0`);
      const products = await response.json();
      return products.data;
    };

    async totalPages(){
      const response = await fetch(`${API_URL}/products`);
      const products = await response.json();
      return products.meta.totalCount;
    };

    async nextPage(page){  
      const response = await fetch(`${API_URL}/products?page=${page}`);
      const products = await response.json();
      const productsData = products.data;
      this.setState(() => {
          return {
              productsData: productsData,
              page: page
            }
      })
    };

    async prevPage(page){  
      const response = await fetch(`${API_URL}/products?page=${page}`);
      const products = await response.json();
      const productsData = products.data;
      this.setState(() => {
          return {
              productsData: productsData,
              page: page
            }
      })
    };

    async componentDidMount(){
        const productsData = await this.allProducts();
        let totalPages = await this.totalPages();
        totalPages = totalPages / 10;
        
        this.setState({
          loading: false,  
          productsData,
          totalPages
        });
    }
    
    render() {
        if(this.state.loading){
            return (
                <div className="d-flex justify-content-center">
                    <img alt="loading" src={SkeletonProducts} width="100%"/>
                </div>
            );
        }
        return (
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <HeaderFooTable
                                    image={'Imagen'}
                                    name={'Nombre'}
                                    shop={'Tienda'}
                                    price={'Precio'}
                                    category={'Categoria'}
                                    type={'Tipo'}
                                    stock={'Stock'}
                                    options={'Opciones'}
                                />
                            </thead>
                            <tfoot>
                                <HeaderFooTable
                                    image={'Imagen'}
                                    name={'Nombre'}
                                    shop={'Tienda'}
                                    price={'Precio'}
                                    category={'Categoria'}
                                    type={'Tipo'}
                                    stock={'Stock'}
                                    options={'Opciones'}
                                />
                            </tfoot>
                            <tbody>
                                {
                                    this.state.productsData.map((product) => {
                                        return(
                                            <ProductTable
                                                key={product.id}
                                                id={product.id}
                                                name={product.name}
                                                avatar={product.avatar}
                                                shop={product.shops.name}
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
                    <div className="d-flex justify-content-center">
                        <nav>
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => this.prevPage(this.state.page -1)}>
                                        <span><i className="fa fa-arrow-left"></i> Anterior</span>
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button className="page-link">
                                        <span>{this.state.page} de {this.state.totalPages} páginas</span>
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button className="page-link" onClick={() => this.nextPage(this.state.page +1)}>
                                        <span>Siguiente <i className="fa fa-arrow-right"></i></span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductsTable;