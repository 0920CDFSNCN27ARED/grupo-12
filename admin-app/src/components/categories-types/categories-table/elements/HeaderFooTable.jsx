import React, {Fragment} from 'react'

const HeaderFooTable = (props) => {
    return (
        <Fragment>
            <tr align="center">
                <th >{props.id}</th>
                <th >{props.name}</th>
                <th>{props.description}</th>
                <th>{props.products}</th>
                <th>{props.type}</th>
                <th>{props.options}</th>
            </tr>
        </Fragment>
    )
}

export default HeaderFooTable;