import React, { Component } from 'react';
import CategoryInfo from './elements/CategoryInfo';
import TypeButton from './elements/TypeButton';
import SkeletonCard from '../../../../assets/images/skeleton-card.gif'
import * as env from '../../../../environment';
const { API_URL } = env[process.env.NODE_ENV];

class DataCardCategories extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            categoriesData: [
                {   
                    id: 1,
                    name: 'N/D',
                    description: 'N/D',
                    count: 0
                },
                {   
                    id: 2,
                    name: 'N/D',
                    description: 'N/D',
                    count: 0
                }
            ],
            typesData: [
                {   
                    id: 1,
                    name: 'N/D',
                    description: 'N/D',
                    count: 0
                },
                {   
                    id: 2,
                    name: 'N/D',
                    description: 'N/D',
                    count: 0
                }
            ],
            categoriesCount:  0,
        }
        this.filterButton = this.filterButton.bind(this)
    }

    async allTypes(){
        const response = await fetch(`${API_URL}/types`);
        const types = await response.json();
        return types.data;
    };

    async categoriesCount(){
        const response = await fetch(`${API_URL}/categories`);
        const categories = await response.json();
        return categories.count;
    };

    async allCategories(){
        const response = await fetch(`${API_URL}/categories/`);
        const categories = await response.json();
        return categories.data;
    };

    async filterButton(typeId){
        const response = await fetch(`${API_URL}/categories/types/${typeId}`);
        const categories = await response.json();
        const filterCategories =  categories.data;
      this.setState(() => {
        return {categoriesData: filterCategories}
      })
    }

    async componentDidMount(){
        const categoriesData = await this.allCategories();
        const typesData = await this.allTypes();
        const categoriesCount = await this.categoriesCount();
        console.log(categoriesCount)

        this.setState({
          categoriesData,
          typesData,
          categoriesCount,
          loading: false
        });
    }

    render() {
        if(this.state.loading){
            return (
                <div className="d-flex justify-content-center flex-column">
                    <img alt="loading" src={SkeletonCard} width="100%" className="mb-3"/>
                </div>
            );
        }

        return (			
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-uppercase text-primary">Categorias de Cervezas {this.state.counter}</h6>
                    <hr/>
                    <div className="d-flex justify-content-center align-items-center m-0">
                        {
                            this.state.typesData.map((type) => {
                                return(
                                    <TypeButton 
                                        key={type.id}
                                        name={type.name}
                                        description={type.description}
                                        count={type.count}
                                        filterButton={() => this.filterButton(type.id)}
                                    />
                                )
                            })
                        }
                        <button 
                            type="button" 
                            className="btn btn-outline-primary mr-2 ml-2 mt-0 mb-0"
                            onClick = {() => this.filterButton(0)}
                        >
                            <span className="badge badge-pill badge-success">{this.state.categoriesCount}</span> <small>Todas</small>
                        </button>
                    </div> 
                </div>
                <div className="card-body">
                    <div className="row">
                        {
                            this.state.categoriesData.map((cat) => {
                                return(
                                    <CategoryInfo 
                                        key={cat.id}
                                        name={cat.name}
                                        description={cat.description}
                                        count={cat.count}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }  
}

export default DataCardCategories;