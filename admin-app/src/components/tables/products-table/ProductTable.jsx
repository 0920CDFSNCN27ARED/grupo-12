import React, {Fragment} from 'react'

const ProductTable = (props) => {
    return (
        <Fragment>
            <tr>
                <td>{props.name}</td>
                <td>{props.description}</td>
                <td>{props.price}</td>
                <td><span className="text-success">{props.category}</span></td>
                <td><span className="text-primary">{props.type}</span></td>
                <td>{props.stock}</td>
            </tr>
        </Fragment>
    )
}

export default ProductTable;