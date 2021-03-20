import React from 'react'
import DataCardsSmallContainer from './cards/data-card-small/DataCardsSmallContainer'
import DataCardShops from './cards/data-card-shops/DataCardShops';
import DataCardLastProduct from './cards/data-card-last-product/DataCardLastProduct';
import DataCardTypes from './cards/data-card-types/DataCardTypes';
import DataCardCategories from './cards/data-card-categories/DataCardCategories';

const Dashboard = () => {
    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <DataCardsSmallContainer />
            <div className="row">
                <div className="col-lg-6 mb-4">	
                    <DataCardShops />
                    <DataCardLastProduct />
                </div>
                <div className="col-lg-6 mb-4">	
                  <DataCardTypes />
                  <DataCardCategories />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;