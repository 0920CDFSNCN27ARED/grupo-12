import React, { Component } from 'react'
import * as env from '../../environment';
const { API_URL, SERVER_URL } = env[process.env.NODE_ENV];

class ProductEdit extends Component {
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
                                <div className="col-12 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="category">Tienda Propietaria:</label>
                                    <select className="custom-select" name="shopId" id="shopId"required>
                                        
                                            <option value="shop.id">shop.name</option>
                                        
                                    </select>
                                    <div className="invalid-feedback">Seleccione un shop</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="name">Nombre de Producto:</label>
                                    <input type="text" name="name" className="form-control required"  placeholder="Cerveza IPA" required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="brewery">Cervería de Origen:</label>
                                    <input type="text" name="brewery" className="form-control"  placeholder="Quién fabrica el producto..."required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="price">Precio:</label>
                                    <input type="text" name="price" className="form-control required" placeholder="Ingrese un valor"required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="discount">Descuento:</label>
                                    <input type="text" name="discount" className="form-control required"  placeholder="Ingrese un valor"required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="description">Stock:</label>
                                    <input type="stock" name="stock" className="form-control"  placeholder="Cantidad de inventario..."required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="description">Descripción Corta:</label>
                                    <input type="text" name="description" className="form-control required" 
                                        placeholder="Describa brevemente el producto..."required/>
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
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="type">Tipo:</label>
                                    <select className="custom-select" name="typeId" id="typeId"required>
                                        
                                            <option value="type.id">type.name</option>
                                        
                                    </select>
                                    <div className="invalid-feedback">Seleccione un tipo</div>
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="category">Categoría:</label>
                                    <select className="custom-select" name="categoryId" id="categoryId"required>
                                        
                                            <option value="category.id">category.name</option>
                                        
                                    </select>
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="abv">ABV (% DE ALCOHOL):</label>
                                    <input id="abv" name="abv" className="form-control" />
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="ibu">IBU (AMARGOR):</label>
                                    <input name="ibu" id="ibu" className="form-control" />
                                </div>
                                <div className="col-lg-4 col-md-4 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="og">OG (Gravedad Original):</label>
                                    <input name="og" id="og" className="form-control" />
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