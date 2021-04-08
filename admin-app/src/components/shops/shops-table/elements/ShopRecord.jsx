import React, {Fragment} from 'react'
import {Link} from 'react-router-dom';
import * as env from '../../../../environment';
const { SERVER_URL } = env[process.env.NODE_ENV];

const ShopRecord = (props) => {
    return (
        <Fragment>
            <tr>
                <td align="center">{props.id}</td>
                <td align="center" >
                    <img alt={props.name} src={`${SERVER_URL}/images/shops/${props.avatar}`} 
                        className='avatar img-circle img-thumbnail' height='50' width='50' />
                </td>
                <td align="center">{props.name}</td>
                <td align="">{props.bio}</td>
                <td align="center">{props.products}</td>
                <td align="center">{props.ranking}</td>
                <td align="center">{props.sales}</td>
                <td align="center" width='150'>
                    <a  className="btn btn-outline-primary btn-sm rounded mr-1" href={`${SERVER_URL}/shops/shop-details/${props.id}`}><i className="fa fa-eye"></i></a>
                    <Link to={`/comercios/editar/${props.id}`} className="btn btn-outline-warning btn-sm rounded mr-1"><i className="fa fa-pencil"></i></Link>
                    <button type="submit" className="btn btn-outline-danger btn-sm rounded"><i className="fa fa-trash-o"></i></button>
                </td>
            </tr>
        </Fragment>
    )
}

export default ShopRecord;