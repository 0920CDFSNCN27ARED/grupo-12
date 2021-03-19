import React from 'react'

const ShopInfo = (props) => {
    return (
        <div className="col-lg-12 mb-4">
            <div className="card shadow">
                 <div className="card-header d-flex align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-uppercase text-dark">{props.name}</h6>
                    <span className="badge rounded-pill bg-success text-white border m-0 ">Estado: {props.status}</span>
                </div>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`http://localhost:3000/images/shops/${props.avatar}`}
                            alt={props.name}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="text-dark mt-3">{props.bio}</h5>
                            <p className="card-text">
                            <small className="text-muted">Telefono: {props.phone}</small><br/>
                            <small className="text-muted">Email: {props.email}</small><br/>
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