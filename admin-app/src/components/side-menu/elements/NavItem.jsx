import React from 'react'
import { Fragment } from 'react';

const NavItem = (props) => {
    return (
        <Fragment>
            <li className="nav-item active">
                <a className="nav-link" href="/">
                <i className={props.icon}></i>
                <span>{props.title}</span></a>
            </li>
        </Fragment>
    )
}

export default NavItem;