import React from 'react'
import Logo from './elements/Logo';
import NavItem from './elements/NavItem';

const SideMenu = () => {
    return (
        <div className="bg-gradient-dark">
            <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
                <Logo />
                <hr className="sidebar-divider my-0" />
                <NavItem 
                    title={'Dashboard'}
                    icon={'fas fa-fw fa-tachometer-alt'}
                    link={'/'}
                />
                <hr className="sidebar-divider"/>
                <div className="sidebar-heading">Administrar</div>
                <NavItem 
                    title={'Productos'}
                    icon={'fa fa-fw fa-product-hunt'}
                    link={'/productos'}
                />
                <NavItem 
                    title={'Usuarios'}
                    icon={'fa fa-fw fa-users'}
                    link={'/usuarios'}
                />
                <NavItem 
                    title={'Comercios'}
                    icon={'fas fa-fw fa-shopping-cart'}
                    link={'/comercios'}
                />
                <NavItem 
                    title={'Categorías'}
                    icon={'fas fa-fw fa-folder-open'}
                    link={'/categorias-tipos'}
                />
                <hr className="sidebar-divider d-none d-md-block"/>
                <NavItem 
                    title={'Salir'}
                    icon={'fa fa-fw fa-sign-out'}
                    link={'/login'}
                />
            </ul>
        </div>
    )
}

export default SideMenu;
    
