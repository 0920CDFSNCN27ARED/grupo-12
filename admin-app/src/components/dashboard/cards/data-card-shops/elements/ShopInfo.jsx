import React from 'react'
import './bootstrap-social.css'

const ShopInfo = (props) => {
    return (
        <div className="col-lg-12 mb-4">
            <div className="card shadow">
                 <div className="card-header d-flex align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-uppercase text-dark">{props.name}</h6>
                    {props.status === 'active' 
                        ? <span className="badge rounded-pill bg-success text-white border m-0 ">Comercio Activo</span>
                        : <span className="badge rounded-pill bg-danger text-white border m-0 ">Comercio Inactivo</span>
                    }
                </div>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={props.avatar}
                            alt={props.name}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="text-dark mt-2">{props.bio}</h5>
                            <p className="card-text">
                            <small className="text-muted">Telefono: <a rel="noreferrer" target="_blank" href={`tel:${props.phone}`}>{props.phone}</a></small><br/>
                            <small className="text-muted">Email: <a rel="noreferrer" target="_blank" href={`mailto:${props.email}`}>{props.email}</a></small><br/>
                            <small className="text-muted">Propietario: {props.users}</small><br/>
                            <div class="mt-2">
                                <a class="btn btn-social-icon btn-facebook mr-2" rel="noreferrer" target="_blank" href={props.facebook}><span class="fa fa-facebook"></span></a>
                                <a class="btn btn-social-icon btn-twitter mr-2" rel="noreferrer" target="_blank" href={props.twitter}><span class="fa fa-twitter"></span></a>
                                <a class="btn btn-social-icon btn-instagram mr-2" rel="noreferrer" target="_blank" href={props.instagram}><span class="fa fa-instagram"></span></a>
                            </div>

                            </p>
                        </div>
                    </div>
                </div>

                <div className="card-footer bg-transparent d-flex justify-content-between">
                    <div>
                        <span className="badge rounded-pill bg-light text-dark border mr-2">{props.products} Productos</span> <small></small>
                        <span className="badge rounded-pill bg-light text-dark border mr-2">{props.orders} Pedidos</span> <small></small>
                        <span className="badge rounded-pill bg-light text-dark border mr-2">{props.shopCoupons} Cupones</span> <small></small>
                    </div>
                     <a target="_blank" rel="nofollow" href="/" className="btn btn-outline-primary btn-sm">Ver Detalles</a>
                </div>
            </div>
        </div>
    )
}

export default ShopInfo;