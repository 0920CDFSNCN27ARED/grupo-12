import React, {Fragment} from 'react'

const HeaderFooTable = (props) => {
    return (
        <Fragment>
            <tr align="center">
                <th >{props.id}</th>
                <th >{props.avatar}</th>
                <th >{props.name}</th>
                <th>{props.bio}</th>
                <th>{props.products}</th>
                <th>{props.ranking}</th>
                <th>{props.sales}</th>
                <th>{props.options}</th>
            </tr>
        </Fragment>
    )
}

export default HeaderFooTable;