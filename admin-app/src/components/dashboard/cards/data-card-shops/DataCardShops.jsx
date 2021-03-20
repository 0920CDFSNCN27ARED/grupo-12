import React, { Component } from 'react';
import ShopInfo from './elements/ShopInfo';
import * as env from '../../../../environment';
const { API_URL, SERVER_URL } = env[process.env.NODE_ENV];

class DataCardShops extends Component {
    constructor(props){
        super(props);
        this.state = {
            shopsData: [
                {   
                    id: 1,
                    name: 'N/D',
                    avatar: 'https://untappd.akamaized.net/venuelogos/venue_9177887_4e0c7be1_bg_176.png',
                    status: 'N/D',
                    bio: 'N/D',
                    email: 'N/D',
                    phone: 'N/D',
                    twitter: 'N/D',
                    facebook: 'N/D',
                    instagram: 'N/D',
                    orders: [],
                    products: [],
                    shopCoupons: [],
                    users: {
                        id: 1,
                        name: 'N/D',
                    },
                },
            ]
        }
    }

    async allShops(){
        const response = await fetch(`${API_URL}/shops`);
        const shops = await response.json();
        return shops.data;
    };

    async componentDidMount(){

        const shopsData = await this.allShops()

        this.setState({
          shopsData,
        });

    }

    render() {
        return (			
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-uppercase text-primary">ULTIMOS COMERCIOS REGISTRADOS</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        {
                            this.state.shopsData.map((shop) => {
                                return(
                                    <ShopInfo 
                                        key={shop.id}
                                        name={shop.name}
                                        avatar={`${SERVER_URL}/images/shops/${shop.avatar}`}
                                        status={shop.status}
                                        bio={shop.bio}
                                        email={shop.email}
                                        phone={shop.phone}
                                        twitter={shop.twitter}
                                        facebook={shop.facebook}
                                        instagram={shop.instagram}
                                        products={shop.products.length}
                                        orders={shop.orders.length}
                                        shopCoupons={shop.shopCoupons.length}
                                        users={shop.users.name}
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

export default DataCardShops;