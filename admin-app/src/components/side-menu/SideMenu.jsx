import React from 'react'
import Logo from './elements/Logo';
import NavItem from './elements/NavItem';

const SideMenu = () => {
    return (
        <div className="bg-gradient-primary">
            <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">

                <Logo />

                <hr className="sidebar-divider my-0" />
                
                <NavItem 
                    title={'Dashboard'}
                    icon={'fas fa-fw fa-tachometer-alt'}
                />

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">Actions</div>

                {/* <!-- Nav Item - Pages --> */}
                <NavItem 
                    title={'Paginas'}
                    icon={'fas fa-fw fa-folder'}
                />

                <NavItem 
                    title={'Analiticas'}
                    icon={'fas fa-fw fa-chart-area'}
                />

                <NavItem 
                    title={'Reportes'}
                    icon={'fas fa-fw fa-table'}
                />
                
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
        </div>
    )
}

export default SideMenu;
    
