const cart = new Cart();
const productsStore = document.getElementById('products-list');
const cartProductsItems = document.getElementById("cart-products-items");
const destroyProductsCartBtn = document.getElementById('destroy-products-cart');
    

cartEvents();

function cartEvents(){

    cart.updateCart();

    destroyOneProduct();

    destroyProducts();
    
    addProductStore();

    //addSimpleProduct();
};

function destroyOneProduct(){
    cart.destroyOneCartProducts();
}

function destroyProducts(){
    destroyProductsCartBtn.addEventListener("click", () => {
        cart.destroyCartProducts();
    });
}

function addProductStore(){
    productsStore.addEventListener('click', (e) => {
        cart.addProduct(e);
    });
}

function addSimpleProduct(){
    alert(getProduct)
    getProduct.addEventListener('click', () => {
        alert(getProduct)
    });
}




