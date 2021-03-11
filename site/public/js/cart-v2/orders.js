const cart = new Cart();
const productsList = document.getElementById('products-list');
const productsCartPanel = document.getElementById("cart-products-items");
const productsCartPage = document.getElementById("cart-products-page");
const destroyProductsCartBtn = document.getElementById('destroy-products-cart');

cartEvents();

function cartEvents(){

    cart.updateCart();

    addProductStore();

    if(productsCartPage == null){
        destroyOneProduct();
        destroyProducts();
    } else {
        destroyOnePageProduct();
    }

};


function destroyOneProduct(){
    productsCartPanel.addEventListener("click", (e) => {       
        cart.destroyOneCartProducts(e);
    });
}

function destroyOnePageProduct() {
    productsCartPage.addEventListener("click", (e) => {
        cart.destroyOneCartPageProducts(e);
    });
}

function destroyProducts(){
    destroyProductsCartBtn.addEventListener("click", () => {
        cart.destroyCartProducts();
    });
}

function addProductStore(){
    productsList.addEventListener("click", (e) => {
        cart.addProduct(e);
    });
}








