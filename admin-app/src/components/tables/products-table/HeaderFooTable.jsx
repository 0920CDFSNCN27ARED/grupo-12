import React, {Fragment} from 'react'

const HeaderFooTable = (props) => {
    return (
        <Fragment>
            <tr>
                <th>{props.name}</th>
                <th>{props.desc}</th>
                <th>{props.price}</th>
                <th>{props.category}</th>
                <th>{props.type}</th>
                <th>{props.stock}</th>
            </tr>
        </Fragment>
    )
}

export default HeaderFooTable;