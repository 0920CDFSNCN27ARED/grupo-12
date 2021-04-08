import React, {Component} from "react";
import HeaderFooTable from './elements/HeaderFooTable';
import CategoryRecord from './elements/CategoryRecord';
import SkeletonProducts from '../../../assets/images/skeleton-products.gif'
import * as env from '../../../environment';
const { API_URL } = env[process.env.NODE_ENV];

class CategoriesTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            totalPages: 0,
            loading:true,
            categoriesData: [
                {
                    id: 1,
                    name: 'N/D',
                    description: 'N/D',
                    count: 0,
                    types: {
                        id: 1,
                        name: 'N/D',
                    },
                    products: {
                        id: 1,
                        name: 'N/D',
                    },
                }
            ]
        };
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this); 
    };

    async allCategories(){
      const response = await fetch(`${API_URL}/categories/list?page=0`);
      const categories = await response.json();
      return categories.data;
    };

    async totalPages(){
      const response = await fetch(`${API_URL}/categories/list`);
      const categories = await response.json();
      return categories.meta.totalCount;
    };

    async nextPage(page){  
      const response = await fetch(`${API_URL}/categories/list?page=${page}`);
      const categories = await response.json();
      const categoriesData = categories.data;
      this.setState(() => {
          return {
              categoriesData: categoriesData,
              page: page
            }
      })
    };

    async prevPage(page){  
      const response = await fetch(`${API_URL}/categories/list?page=${page}`);
      const categories = await response.json();
      const categoriesData = categories.data;
      this.setState(() => {
          return {
              categoriesData: categoriesData,
              page: page
            }
      })
    };

    async componentDidMount(){
        const categoriesData = await this.allCategories();
        let totalPages = await this.totalPages();
        totalPages = parseInt(totalPages / 10);
        
        this.setState({
          loading: false,  
          categoriesData,
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
                                    id={'#'}
                                    name={'Nombre'}
                                    description={'Descripción'}
                                    products={'Productos'}
                                    type={'Tipo'}
                                    options={'Opciones'}
                                />
                            </thead>
                            <tfoot>
                                <HeaderFooTable
                                    id={'#'}
                                    name={'Nombre'}
                                    description={'Descripción'}
                                    products={'Productos'}
                                    type={'Tipo'}
                                    options={'Opciones'}
                                />
                            </tfoot>
                            <tbody>
                                {
                                    this.state.categoriesData.map((category) => {
                                        return(
                                            <CategoryRecord
                                                key={category.id}
                                                id={category.id}
                                                name={category.name}
                                                description={category.description}
                                                products={category.products.length}
                                                type={category.types.name}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    { this.state.totalPages > 1 ?
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
                    : null}
                    
                </div>
            </div>
        )
    }
}

export default CategoriesTable;