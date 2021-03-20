import React from 'react'
import ProductsTable from './products-table/ProductsTable';

const Products = () => {
    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Productos Publicados</h1>
            </div>
            <ProductsTable />
        </div>
    )
}

export default Products;