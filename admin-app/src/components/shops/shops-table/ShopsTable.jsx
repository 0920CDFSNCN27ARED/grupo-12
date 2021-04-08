import React, {Component} from "react";
import HeaderFooTable from './elements/HeaderFooTable';
import ShopRecord from './elements/ShopRecord';
import SkeletonProducts from '../../../assets/images/skeleton-products.gif'
import * as env from '../../../environment';
const { API_URL } = env[process.env.NODE_ENV];

class ShopsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            totalPages: 0,
            loading:true,
            shopsData: [
                {
                    id: 1,
                    name: 'N/D',
                    description: 'N/D',
                }
            ]
        };
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this); 
    };

    async allShops(){
      const response = await fetch(`${API_URL}/shops/list?page=0`);
      const shops = await response.json();
      return shops.data;
    };

    async totalPages(){
      const response = await fetch(`${API_URL}/shops/list`);
      const shops = await response.json();
      return shops.meta.totalCount;
    };

    async nextPage(page){  
      const response = await fetch(`${API_URL}/shops/list?page=${page}`);
      const shops = await response.json();
      const shopsData = shops.data;
      this.setState(() => {
          return {
              shopsData: shopsData,
              page: page
            }
      })
    };

    async prevPage(page){  
      const response = await fetch(`${API_URL}/shops/list?page=${page}`);
      const shops = await response.json();
      const shopsData = shops.data;
      this.setState(() => {
          return {
              shopsData: shopsData,
              page: page
            }
      })
    };

    async componentDidMount(){
        const shopsData = await this.allShops();
        console.log(shopsData);
        let totalPages = await this.totalPages();
        totalPages = parseInt(totalPages / 10);
        
        this.setState({
          loading: false,  
          shopsData,
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
                                    avatar={'Imagen'}
                                    name={'Nombre'}
                                    bio={'Descripción'}
                                    products={'Productos'}
                                    ranking={'Puntuación'}
                                    sales={'Ventas'}
                                    options={'Opciones'}
                                />
                            </thead>
                            <tfoot>
                                <HeaderFooTable
                                    id={'#'}
                                    avatar={'Imagen'}
                                    name={'Nombre'}
                                    bio={'Descripción'}
                                    products={'Productos'}
                                    ranking={'Puntuación'}
                                    sales={'Ventas'}
                                    options={'Opciones'}
                                />
                            </tfoot>
                            <tbody>
                                {
                                    this.state.shopsData.map((shop) => {
                                        return(
                                            <ShopRecord
                                                key={shop.id}
                                                id={shop.id}
                                                avatar={shop.avatar}
                                                name={shop.name}
                                                bio={shop.bio}
                                                products={shop.products.length}
                                                ranking={shop.ranking}
                                                sales={shop.sales}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    { this.state.totalPages <= 10 ?
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

export default ShopsTable;