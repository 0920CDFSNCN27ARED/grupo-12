import React from 'react'

const TypeButton = (props) => {
    
    return (
        <button 
            type="button" 
            className="btn btn-outline-primary mr-2 ml-2 mt-0 mb-0"
            onClick = {props.filterButton}>

            <span className="badge badge-pill badge-success">{props.count}</span> <small>{props.name}</small>
        </button>
    )
}

export default TypeButton;