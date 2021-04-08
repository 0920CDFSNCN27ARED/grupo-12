import React, {Component} from "react";
import HeaderFooTable from './elements/HeaderFooTable';
import UserRecord from './elements/UserRecord';
import SkeletonProducts from '../../../assets/images/skeleton-products.gif'
import * as env from '../../../environment';
const { API_URL } = env[process.env.NODE_ENV];

class UsersTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            totalPages: 0,
            loading:true,
            usersData: [
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

    async allUsers(){
      const response = await fetch(`${API_URL}/users/list?page=0`);
      const user = await response.json();
      return user.data;
    };

    async totalPages(){
      const response = await fetch(`${API_URL}/users/list`);
      const user = await response.json();
      return user.meta.totalCount;
    };

    async nextPage(page){  
      const response = await fetch(`${API_URL}/users/list?page=${page}`);
      const users = await response.json();
      const usersData = users.data;
      this.setState(() => {
          return {
              usersData: usersData,
              page: page
            }
      })
    };

    async prevPage(page){  
      const response = await fetch(`${API_URL}/users/list?page=${page}`);
      const users = await response.json();
      const usersData = users.data;
      this.setState(() => {
          return {
              usersData: usersData,
              page: page
            }
      })
    };

    async componentDidMount(){
        const usersData = await this.allUsers();
        let totalPages = await this.totalPages();
        console.log(totalPages);
        totalPages = parseInt(totalPages / 10);
        
        this.setState({
          loading: false,  
          usersData,
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
                                    avatar={'Foto'}
                                    name={'Nombre'}
                                    userName={'Nombre de usuario'}
                                    email={'Email'}
                                    phone={'Telefono'}
                                    bio={'Bio'}
                                    options={'Opciones'}
                                />
                            </thead>
                            <tfoot>
                                <HeaderFooTable
                                    id={'#'}
                                    avatar={'Foto'}
                                    name={'Nombre'}
                                    userName={'Nombre de usuario'}
                                    email={'Email'}
                                    phone={'Telefono'}
                                    bio={'Bio'}
                                    options={'Opciones'}
                                />
                            </tfoot>
                            <tbody>
                                {
                                    this.state.usersData.map((user) => {
                                        return(
                                            <UserRecord
                                                key={user.id}
                                                id={user.id}
                                                avatar={user.avatar}
                                                name={user.name}
                                                userName={user.userName}
                                                email={user.email}
                                                phone={user.phone}
                                                bio={user.bio}
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

export default UsersTable;