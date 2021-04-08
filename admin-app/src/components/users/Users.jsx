import React from 'react'
import UsersTable from './users-table/UsersTable'

const Users = () => {
    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Usuarios Registrados</h1>
            </div>
            <UsersTable/>
        </div>
    )
}

export default Users;