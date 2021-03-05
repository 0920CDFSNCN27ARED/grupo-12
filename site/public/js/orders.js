const cart = new Cart();
const cartPanelSidebar = document.querySelector('.cart-panel-sidebar');
const products = document.getElementById('products-list');
const productsList = document.querySelector('#cart-product');

cartEvents();

function cartEvents(){
    products.addEventListener('click', (e) => {
        cart.addProduct(e);
    })
}