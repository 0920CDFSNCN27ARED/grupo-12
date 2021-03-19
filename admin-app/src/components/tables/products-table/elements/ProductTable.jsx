import React, {Fragment} from 'react'

const ProductTable = (props) => {
    return (
        <Fragment>
            <tr>
                <td align="center" >
                    <img alt={props.name} src={`http://localhost:3000/images/products/${props.avatar}`} 
                        className='avatar img-circle img-thumbnail' height='50' width='50' /><br/>
                    <small>{props.name}</small>
                </td>
                <td width='40%'><small>{props.description}</small></td>
                <td align="center" >${props.price}</td>
                <td align="center" >{props.category}</td>
                <td align="center" >{props.type}</td>
                <td align="center" >{props.stock}</td>
            </tr>
        </Fragment>
    )
}

export default ProductTable;