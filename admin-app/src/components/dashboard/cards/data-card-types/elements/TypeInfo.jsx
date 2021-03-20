import React from 'react'

const TypeInfo = (props) => {
    
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-outline-primary text-dark shadow">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="">
                        <h4 className=" text-uppercase m-0">{props.name}</h4>
                    </div>
                    <div className="">
                        <button type="button" className="btn btn-outline-primary">
                            <span className="badge badge-pill badge-success">{props.count}</span> <small>Categorias</small>
                        </button>
                    </div>
                </div>
                <div className="card-footer bg-transparent text-center">
                    <small>{props.description}</small>
                </div>
            </div>
        </div>
    )
}

export default TypeInfo;