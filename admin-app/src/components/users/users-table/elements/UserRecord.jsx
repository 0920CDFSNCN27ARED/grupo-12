import React, {Fragment} from 'react'
import {Link} from 'react-router-dom';
import * as env from '../../../../environment';
const { SERVER_URL } = env[process.env.NODE_ENV];

const UserRecord = (props) => {
    return (
        <Fragment>
            <tr>
                <td align="center">{props.id}</td>
                <td align="center" >
                    <img alt={props.avatar} src={`${SERVER_URL}/images/users/${props.avatar}`} 
                        className='avatar img-circle img-thumbnail' height='50' width='50' />
                </td>
                <td align="center">{props.name}</td>
                <td align="center">{props.userName}</td>
                <td align="center">{props.email}</td>
                <td align="center">{props.phone}</td>
                <td align="">{props.bio}</td>
                <td align="center" width='150'>
                    <Link to={`/usuarios/editar/${props.id}`} className="btn btn-outline-warning btn-sm rounded mr-1"><i className="fa fa-pencil"></i></Link>
                    <button type="submit" className="btn btn-outline-danger btn-sm rounded"><i className="fa fa-trash-o"></i></button>
                </td>
            </tr>
        </Fragment>
    )
}

export default UserRecord;