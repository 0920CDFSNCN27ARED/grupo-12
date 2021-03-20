import React, { Component } from 'react'
import * as env from '../../environment';
const { API_URL, SERVER_URL } = env[process.env.NODE_ENV];

class ProductDetails extends Component {
    constructor(props){
        super(props);
        this.state ={
            productData: {
                id:4,
                name:"N/D",
                description:"Las mejores cervecerías artesanas del mundo.",
                brewery:"N/D",
                price:0,
                discount:0,
                stock:4,
                ibu:0,
                og:0,
                abv:0,
                avatar:"without-image.png",
                gallery01:"product-gallery-10.jpg",
                gallery02:"product-gallery-01.jpg",
                gallery03:"product-gallery-02.jpg",
                status:"active",
                shops: {name:"N/D"},
                categories: {name:"N/D"},
                types: {name:"N/D"},
                orders:[],
            }
        }
    }


    getProduct = async (id) => {
      const response = await fetch(`${API_URL}/products/${id}`);
      const product = await response.json();
      return product.data;
    };

    async componentDidMount(){
        let id = this.props.match.params.id;
        const productData = await this.getProduct(id);
        console.log(productData)

        this.setState({
            productData,
        })
    }

    
    render() {
        return (
        <div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-uppercase text-primary">
                        <img src={`${SERVER_URL}/images/products/${this.state.productData.avatar}`}
                            className="img-profile rounded-circle border mr-2" 
                            width={'30'}
                            alt={'avatar'} 
                        />
                        {this.state.productData.name}</h5>
                </div>
                <div className="card-body">
                    <div className="card-group">
                        <div className="card">
                            <img src={`${SERVER_URL}/images/products/${this.state.productData.gallery01}`}
                            className="card-img-top" alt={'card_image'} />
                        </div>
                        <div className="card">
                            <img src={`${SERVER_URL}/images/products/${this.state.productData.gallery02}`}
                            className="card-img-top" alt={'card_image'} />
                        </div>
                        <div className="card">
                            <img src={`${SERVER_URL}/images/products/${this.state.productData.gallery03}`}
                            className="card-img-top" alt={'card_image'} />
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <p>{this.state.productData.description}</p>
 
                    </div>
                   
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-between">
                    <div>
                        <span className="badge rounded-pill bg-light text-dark border mr-2">Categoria: {this.state.productData.categories.name}</span> <small></small>
                        <span className="badge rounded-pill bg-light text-dark border mr-2">Tipo: {this.state.productData.types.name}</span> <small></small>
                        <span className="badge rounded-pill bg-light text-dark border mr-2">Compras: {this.state.productData.orders.length}</span> <small></small>
                    </div>
                    <div>
                        <a href="/productos" className="btn btn-outline-primary btn-sm mr-2">Volver</a>
                        <a target="_blank" rel="noreferrer" href={`${SERVER_URL}/products/${this.state.productData.id}/productDetails`} className="btn btn-outline-primary btn-sm">Ver Detalles</a>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default ProductDetails;