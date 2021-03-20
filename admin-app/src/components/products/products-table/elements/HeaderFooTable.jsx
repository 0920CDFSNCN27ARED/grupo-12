import React, {Fragment} from 'react'

const HeaderFooTable = (props) => {
    return (
        <Fragment>
            <tr align="center">
                <th >{props.image}</th>
                <th >{props.name}</th>
                <th>{props.shop}</th>
                <th>{props.price}</th>
                <th>{props.category}</th>
                <th>{props.type}</th>
                <th>{props.stock}</th>
                <th>{props.options}</th>
            </tr>
        </Fragment>
    )
}

export default HeaderFooTable;