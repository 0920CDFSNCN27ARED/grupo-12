import React from 'react'
import ShopsTable from './shops-table/ShopsTable'

const Shops = () => {
    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Comercios Registrados</h1>
            </div>
            <ShopsTable/>
        </div>
    )
}

export default Shops;