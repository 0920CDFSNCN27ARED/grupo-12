import React from 'react'
import CategoriesTable from './categories-table/CategoriesTable'

const CategoriesTypes = () => {
    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Categorias y Tipos</h1>
            </div>
            <CategoriesTable />
        </div>
    )
}

export default CategoriesTypes;