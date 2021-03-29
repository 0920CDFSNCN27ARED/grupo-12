import React, {Fragment} from 'react'
import {Link} from 'react-router-dom';

const CategoryRecord = (props) => {
    return (
        <Fragment>
            <tr>
                <td align="center">{props.id}</td>
                <td align="center">{props.name}</td>
                <td align="">{props.description}</td>
                <td align="center">{props.products}</td>
                <td align="center">{props.type}</td>
                <td align="center" width='150'>
                    <Link to={`/categorias/editar/${props.id}`} className="btn btn-outline-warning btn-sm rounded mr-1"><i className="fa fa-pencil"></i></Link>
                    <button type="submit" className="btn btn-outline-danger btn-sm rounded"><i className="fa fa-trash-o"></i></button>
                </td>
            </tr>
        </Fragment>
    )
}

export default CategoryRecord;