import React from 'react'
import { Fragment } from 'react';

const NavItem = ({title, icon}) => {
    return (
        <Fragment>
            <li className="nav-item active">
                <a className="nav-link" href="/">
                <i className={icon}></i>
                <span>{title}</span></a>
            </li>
        </Fragment>
    )
}

export default NavItem;