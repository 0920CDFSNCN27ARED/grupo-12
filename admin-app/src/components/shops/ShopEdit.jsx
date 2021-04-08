import React, { Component } from 'react'
import * as env from '../../environment';
const { API_URL } = env[process.env.NODE_ENV];

class ShopEdit extends Component {
    constructor(props){
        super(props);
        this.state ={
            shopData: [
                {
                    id: 1,
                    name: 'N/D',
                    phone: 0,
                    email: 'no-email@example.com',
                    avatar:"without-image.png",
                    status:'N/D',
                    ranking:0,
                    sales:0,
                    bio: 'N/D',
                    facebook: "N/D",
                    instagram: "N/D",
                    twitter:"N/D",
                    tokenKey: "N/D",
                    publicKey: "N/D",
                    marketplaceLink: "N/D",
                    marketplaceApp: "N/D",
                    products: [{
                        id: 1,
                        name: 'N/D',
                    }],
                    users: [{
                        id: 1,
                        name: 'N/D',
                    }],
                    orders: [{
                        id: 1,
                        userId: 1,
                    }],
                    shopCoupons: [{
                        id: 1,
                        name: 'N/D',
                        couponCode:'N/D'
                    }],
                    shopPayments: [{
                        id: 1,
                        name: 'N/D',
                    }],
                    shopShippingMethods: [{
                        id: 1,
                        name: 'N/D',
                    }],
                }
            ],
        }
    }

    getShop = async (id) => {
      const response = await fetch(`${API_URL}/shops/${id}`);
      const shop = await response.json();
      return shop.data;
    };

    updateShop= async (id, data) => {
      const response = await fetch(`${API_URL}/shops/${id}`,{
          method: "post",
          headers: {
              "Content-type": "application/json"
          },
          body: data,
      });
      return await response.json();
    };  

    async componentDidMount(){
        let id = this.props.match.params.id;
        const shopData = await this.getShop(id);
        console.log(shopData.products.length)
        this.setState({
            shopData,
        })
    }

    
    render() {
        return (
           <div className="card shadow mb-4">
                <div className="card-header py-4">
                    <h6 className="m-0 font-weight-bold text-uppercase text-primary">
                        Editar Comercio {this.state.shopData.name}
                    </h6>
                </div>
                <div className="card-body">
                    <form action={`/${this.state.shopData.id}/edit-data`} method="POST" encType="multipart/form-data" className="needs-validation" noValidate>
                        <div className="modal-body">
                            <div className="row p-3">
                               
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="name">Nombre:</label>
                                    <input type="text" name="name" className="form-control"  defaultValue={this.state.shopData.name} placeholder='Nombre de la tienda..'required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group ">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="images">Imagen:</label>
                                    <small>Imagen principal del comercio</small>
                                    <input type="file" id="avatar" name="avatar" className="form-control" data-show-preview="true" />
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="bio">Sobre mí:</label>
                                    <input type="text" name="bio" id="bio" className="form-control"  placeholder='Bio de la tienda..' defaultValue={this.state.shopData.bio}  required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="email">Email:</label>
                                    <input type="text" name="email" className="form-control" placeholder='Ingrese un email'defaultValue={this.state.shopData.email} required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="phone">Teléfono:</label>
                                    <input type="text" name="phone" className="form-control" placeholder='Ej: 2283546271' defaultValue={this.state.shopData.phone} required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="twitter">Twitter:</label>
                                    <input type="text" name="twitter" className="form-control" placeholder='http://www.twitter.com/usuario' defaultValue={this.state.shopData.twitter} required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="facebook">Facebook:</label>
                                    <input type="text" name="facebook" className="form-control" placeholder='http://www.facebook.com/usuario' defaultValue={this.state.shopData.facebook} required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="instagram">Instagram:</label>
                                    <input type="text" name="instagram" className="form-control" placeholder='http://www.instagram.com/usuario' defaultValue={this.state.shopData.instagram} required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-transparent d-flex justify-content-between align-items-center">
                            <div>
                                <a href="/comercios" className="btn btn-outline-primary mr-2">Volver</a>
                                <button className="btn btn-warning" type="submit">Editar Comercio</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ShopEdit;