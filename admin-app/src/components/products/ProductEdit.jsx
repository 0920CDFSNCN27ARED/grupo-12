import React, { Component } from 'react'
import * as env from '../../environment';
const { API_URL, SERVER_URL } = env[process.env.NODE_ENV];

class ProductEdit extends Component {
    constructor(props){
        super(props);
        this.state ={
            productData: {
                id:4,
                avatar:"without-image.png",
                gallery01:"product-gallery-10.jpg",
                gallery02:"product-gallery-01.jpg",
                gallery03:"product-gallery-02.jpg",
                status:"active",
                shops: {id:1},
                categories: {name:"N/D"},
                types: {name:"N/D"},
                orders:[],
            },
            categoriesData: [
                {
                    id: 1,
                    name: 'N/D',
                    description: 'N/D',
                    types: {
                        id: 1,
                        name: 'N/D',
                    },
                    products: [{
                        id: 1,
                        name: 'N/D',
                    }],
                }
            ],
            typesData: [
                {
                    id: 1,
                    name: 'N/D',
                }
            ]
        }
    }


    getProduct = async (id) => {
      const response = await fetch(`${API_URL}/products/${id}`);
      const product = await response.json();
      return product.data;
    };

    getCategories = async () => {
        const response = await fetch(`${API_URL}/categories`);
        const categories = await response.json();
        return categories.data;
    };

    getTypes = async () => {
        const response = await fetch(`${API_URL}/types`);
        const types = await response.json();
        return types.data;
    };

    async componentDidMount(){
        let id = this.props.match.params.id;
        const productData = await this.getProduct(id);
        const categoriesData= await this.getCategories();
        const typesData = await this.getTypes();
        console.log(categoriesData);
        this.setState({
            productData,
            categoriesData,
            typesData
        })
    }

    
    render() {
        return (
        <div>
           <div className="card shadow mb-4">
                <div className="card-header py-4">
                    <h6 className="m-0 font-weight-bold text-uppercase text-primary">
                        <img src={`${SERVER_URL}/images/products/${this.state.productData.avatar}`}
                            className="img-profile rounded-circle border mr-2" 
                            width={'30'}
                            alt={'avatar'} 
                        />
                        Editar Producto {this.state.productData.name}</h6>
                </div>
                <div className="card-body">
                    <form action="/:id/edit-product" method="POST" encType="multipart/form-data" className="needs-validation" noValidate>
                        <div className="modal-body">
                            <div className="row p-3">
                            <div className="col-lg-12 col-md-12 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="shop">Tienda Propietaria:</label>
                                    <input type="text" name="shop" className="form-control required"  defaultValue={this.state.productData.shops.name} placeholder="Nombre de la tienda" required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="name">Nombre de Producto:</label>
                                    <input type="text" name="name" className="form-control required"  defaultValue={this.state.productData.name} placeholder="Nombre.." required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="brewery">Cervería de Origen:</label>
                                    <input type="text" name="brewery" className="form-control"  defaultValue={this.state.productData.brewery} placeholder="Quién fabrica el producto..."required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="price">Precio:</label>
                                    <input type="text" name="price" className="form-control required" defaultValue={this.state.productData.price} placeholder="Ingrese un valor"required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="discount">Descuento:</label>
                                    <input type="text" name="discount" className="form-control required"  defaultValue={this.state.productData.discount} placeholder="Ingrese un valor"required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="description">Stock:</label>
                                    <input type="stock" name="stock" className="form-control"  defaultValue={this.state.productData.stock} placeholder="Cantidad de inventario..."required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="description">Descripción Corta:</label>
                                    <input type="text" name="description" className="form-control required" 
                                        defaultValue={this.state.productData.description} placeholder="Describa brevemente el producto..."required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="status">Estado:</label>
                                    <select className="custom-select" name="status" id="status"required>
                                        <option defaultValue value="active">Habilitado</option>
                                        <option value="blocked">Bloqueado</option>
                                    </select>
                                    <div className="invalid-feedback">Seleccione un estado</div>
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="typeId">Tipo:</label>
                                    <select className="custom-select" name="typeId" id="typeId"required>
                                    {
                                        this.state.typesData.map((type) => {
                                            return(
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            )
                                        })
                                    }
                                    </select>
                                    <div className="invalid-feedback">Seleccione un tipo</div>
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="category">Categoría:</label>
                                    <select className="custom-select" name="categoryId" id="categoryId"required>
                                    {
                                        this.state.categoriesData.map((category) => {
                                            return(
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="abv">ABV (% DE ALCOHOL):</label>
                                    <input id="abv" name="abv" className="form-control" value={this.state.productData.abv}/>
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="ibu">IBU (AMARGOR):</label>
                                    <input name="ibu" id="ibu" className="form-control" value={this.state.productData.ibu}/>
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="og">OG (Gravedad Original):</label>
                                    <input name="og" id="og" className="form-control" value={this.state.productData.og}/>
                                </div>
                            
                                <div className="col-lg-6 col-md-6 form-group mt-3">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="images">Imagen:</label>
                                    <small>Imagen principal del producto</small>
                                    <input type="file" id="avatar" name="avatar" className="form-control" data-show-preview="true" />
                                </div>
                            
                                <div className="col-lg-6 col-md-6 form-group mt-3">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="images">Galería:</label>
                                    <small>Suba 3 hasta imágenes</small>
                                    <input type="file" multiple id="gallery" name="gallery" className=" form-control" data-show-preview="true" />
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 form-group">
                                        <div className="preview-images d-flex flex-row ml-2 mt-5"></div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="details">Detalles:</label>
                                    <textarea name="details" id="details" className="form-control" placeholder="Descripción amplia del producto"
                                        rows="4"required></textarea>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-transparent d-flex justify-content-between align-items-center">
                            <div>
                                <span className="badge rounded-pill bg-light text-dark border mr-2">Categoria: {this.state.productData.categories.name}</span> <small></small>
                                <span className="badge rounded-pill bg-light text-dark border mr-2">Tipo: {this.state.productData.types.name}</span> <small></small>
                                <span className="badge rounded-pill bg-light text-dark border mr-2">Compras: {this.state.productData.orders.length}</span> <small></small>
                            </div>
                            <div>
                                <a href="/productos" className="btn btn-outline-primary mr-2">Volver</a>
                                <button className="btn btn-warning" type="submit">Editar Producto</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    }
}

export default ProductEdit;