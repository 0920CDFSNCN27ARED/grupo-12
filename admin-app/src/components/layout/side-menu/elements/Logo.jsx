import React from 'react'
import Image from '../../../../assets/images/logo-dark.png';
import { Fragment } from 'react';

const Logo = () => {
    return (
        <Fragment>
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/" >
                <img src={Image} height="65" alt="logo"/>
            </a>
        </Fragment>
    )
}

export default Logo;