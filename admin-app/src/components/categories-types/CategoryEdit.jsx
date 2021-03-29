import React, { Component } from 'react'
import * as env from '../../environment';
const { API_URL } = env[process.env.NODE_ENV];

class ProductEdit extends Component {
    constructor(props){
        super(props);
        this.state ={
            categoryData: [
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

    getCategory = async (id) => {
      const response = await fetch(`${API_URL}/categories/${id}`);
      const category = await response.json();
      return category.data;
    };

    updateCategory = async (id, data) => {
      const response = await fetch(`${API_URL}/categories/${id}`,{
          method: "post",
          headers: {
              "Content-type": "application/json"
          },
          body: data,
      });
      return await response.json();
    };  

    getTypes = async (id) => {
      const response = await fetch(`${API_URL}/types`);
      const types = await response.json();
      return types.data;
    };

    async componentDidMount(){
        let id = this.props.match.params.id;
        const categoryData = await this.getCategory(id);
        const typesData = await this.getTypes();
        console.log(categoryData)


        this.setState({
            categoryData,
            typesData
        })
    }

    
    render() {
        return (
           <div className="card shadow mb-4">
                <div className="card-header py-4">
                    <h6 className="m-0 font-weight-bold text-uppercase text-primary">
                        Editar Categoría {this.state.categoryData.name}
                    </h6>
                </div>
                <div className="card-body">
                    <form action={`/edit-category/${this.state.categoryData.id}`} method="POST" encType="multipart/form-data" className="needs-validation" noValidate>
                        <div className="modal-body">
                            <div className="row p-3">
                               
                                <div className="col-lg-6 col-md-6 form-group">
                                    <label  className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="name">Nombre:</label>
                                    <input type="text" name="name" className="form-control" value={this.state.categoryData.name} placeholder="Nombre" required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
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
                                <div className="col-lg-12 col-md-12 form-group">
                                    <label className="text-xs font-weight-bold text-primary text-uppercase" htmlFor="description">Descripción:</label>
                                    <input type="text" name="description" id="description" className="form-control"  value={this.state.categoryData.description} placeholder="Descripción de la categoría..." required/>
                                    <div className="valid-feedback">Ok válido!</div>
                                    <div className="invalid-feedback">Complete este campo</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-transparent d-flex justify-content-between align-items-center">
                            <div>
                                <span className="badge rounded-pill bg-light text-dark border mr-2">Cantidad de Productos: {this.state.categoryData.count}</span> <small></small>
                            </div>
                            <div>
                                <a href="/categorias-tipos" className="btn btn-outline-primary mr-2">Volver</a>
                                <button className="btn btn-warning" type="submit">Editar Categoría</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProductEdit;