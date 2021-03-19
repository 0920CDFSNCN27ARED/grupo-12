import React from 'react'

const CategoryInfo = (props) => {
    return (
        <div className="col-lg-6 mb-4">
           <div className="card shadow">
                <div className="card-body d-flex justify-content-between align-items-center m-0">
                    <div className="">
                        <h4 className="text-dark text-uppercase m-0">{props.name}</h4>
                    </div>
                    <div className="">
                        <span className="badge badge-pill badge-success">{props.count} Productos</span> <small></small>
                    </div>
                </div>
                <div className="card-footer bg-transparent text-center">
                    <small>{props.description}</small>
                </div>
            </div>
        </div>
    )
}

export default CategoryInfo;