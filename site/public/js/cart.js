class Cart {
    // Agregar un producto al carrito
    async addProduct(e) {
        if (e.target.classList.contains("add-product")) {
            // Obtener product
            const productId = e.target.dataset.id;
            const getProduct = await getOneProduct(productId);
            const actualQty = $(`#qty-${productId}`).val();

            let product = {
                id: getProduct.id,
                name: getProduct.name,
                avatar: getProduct.avatar,
                qty: actualQty,
                price: getProduct.price,
                discount: getProduct.discount,
                abv: getProduct.abv,
                ibu: getProduct.ibu,
                og: getProduct.og,
            };

            // Agregamos o actualizar cantidad en localStorage
            localStorage.setItem(
                `product-${productId}`,
                JSON.stringify(product)
            );

            // Limpiamos HTML del carrito
            destroyAllProductCart();
            destroytotalCart();

            // Actualizar HTML del carrito
            updateAllProducts();

            // Notificamos
            let message = `El producto ${product.name} fue agregado al carrito.`;
            notification(product, message);
        };
        // Actualizar pagina en 2.5s
        setInterval("location.reload()",2500);
    }

    // Obtener productos actualizados al recargar
    updateCart() {
        updateAllProducts();
    }

    // Eliminar productos del carrito
    destroyCartProducts() {
        // Limpiamos localStorage
        localStorage.clear();

        // Limpiamos HTML del carrito
        destroyAllProductCart();
        destroytotalCart();

        // Actualizamos carrito
        updateAllProducts();

        // Notificamos
        let message = `Todos los productos fueron quitados del carrito.`;
        destroyCartNotification(message);
    }

    // Eliminar un producto del carrito
    destroyOneCartProducts(){
        const destroyProductBtn = document.getElementsByClassName('destroy-product-button');
        let products = destroyProductBtn;
        for(let i=0; i <= products.length; i++){
            $(products[i]).on('click',function () {
                // Obtenermos producto y lo eliminamos del localStorage
                let key = $(this).data("id");
                let product = JSON.parse(localStorage.getItem(key));
                localStorage.removeItem(`${key}`);
                
                // Limpiamos HTML del carrito
                destroyAllProductCart();
                destroytotalCart();

                // Actualizamos carrito
                updateAllProducts();

                // Notificamos
                let message = `Un producto ${product.name} fue eliminado del carrito.`;
                destroyCartNotification(message);
                
                // Actualizar pagina en 2.5s
                setInterval("location.reload()",2500);
            });
        }
    }    
};


// Obtener un producto
async function getOneProduct(id){
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    let product = await response.json();
    return product.data;
};

// Actualizar productos en carrito
function updateAllProducts() {
    let total = 0;
    let discount = 0;
    let productsQty = 0;
    // Agregar o actualizar carrito
    for (let i = 0; i <= localStorage.length - 1; i++) {
        let key = localStorage.key(i);
        if (key.includes("product")) {
            let product = JSON.parse(localStorage.getItem(key));

            // Mostrar producto
            addOneProductCart(product);

            // Calcular total
            total = (product.price - product.discount) * product.qty + total;

            // Calcular total
            discount = product.discount * product.qty + discount;
            productsQty = productsQty +1;
        }
    }

    // Actualizamos totales en localStorage
    if(productsQty != 0){
        localStorage.setItem("total", total.toFixed(2));
        localStorage.setItem("discount", discount.toFixed(2));
    }

    // Actualizamos contador de productos
    updateCartCounter(productsQty);

    // Mostrar total y descuento
    totalCart(total, discount);
}

// Calcular total
function totalCart(total, discount) {
    const cartFooter = document.getElementById("cart-footer");

    // Agregamos total
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("d-flex", "flex-column", "justify-content-center");
    totalDiv.setAttribute("id", "cart-total");
    totalDiv.innerHTML = `
        <span class="cart-panel-total">Descuentos: -$${discount.toFixed(2)}</span>
        <span class="cart-panel-total">Subtotal: $${total.toFixed(2)}</span>
    `;
    cartFooter.appendChild(totalDiv);
};

function destroytotalCart() {
    const cartTotal = document.getElementById("cart-total");
    cartTotal.remove();
}

// Actualizar contado de productos
function updateCartCounter(productsQty) {
    const cartCounter = document.getElementById("cart-counter");

    // Borramos contador
    while (cartCounter.firstChild) {
        cartCounter.removeChild(cartCounter.firstChild);
    }

    // Agregamos contador
    const counter = document.createElement("div");
    counter.classList.add("d-inline-flex", "align-items-center");
    counter.innerHTML = `
        <span class="font-weight-bold mr-2">CARRITO</span>
        <span class="cart-counter">${productsQty}</span>
    `;
    cartCounter.appendChild(counter);
};

// Borrar productos del carrito
function destroyAllProductCart() {
    const cartProducts = document.getElementById("cart-products-items");
    while (cartProducts.firstChild) {
        cartProducts.removeChild(cartProducts.firstChild);
    }
};

// Agregar un producto al carrito
function addOneProductCart(product) {
    const cartProducts = document.getElementById("cart-products-items");
    const productItem = document.createElement("div");
    productItem.innerHTML = `
    <div id="product-item-${product.id}" class="cart-panel-product d-flex align-items-center pl-1">
        
        <a class="product-delete-cart destroy-product-button" data-id="product-${product.id}"><i class="icon-line-trash-2" style="font-size: 15px;"></i></a>
        <div class="w-25 p-0 m-0">
            <img class="cart-img-animation" src="/images/products/${product.avatar}" width="75" />
        </div>
        <div class="w-75 m-0 p-0 d-flex flex-column justify-content-center">
            <span class="cart-panel-product-title">
                <a href="/products/${product.id}/productDetails">${product.name}</a>
            </span>
            <span class="cart-panel-product-desc">
                ABV ${product.abv}% | IBU ${product.ibu} | OG ${product.og}
            </span>
            <span class="cart-panel-product-price">
                ${product.qty} x $${product.price} <small class="text-success mt-0">(-$${ product.discount})</small> = $${(product.price - product.discount) * product.qty}
            </span>
        </div>
    </div>
    `;
    cartProducts.appendChild(productItem);
};

// Notificar agregado o actualización de producto
function notification(product, message) {
    const productItem = document.getElementById(`product-item-${product.id}`);
    const notification = document.createElement("div");
    notification.innerHTML = `
    <div 
        id="message${product.id}"
        data-notify-position="top-right"
        data-notify-type="success"
        data-notify-timeout="5000"
        data-notify-msg="<i class=icon-ok-sign></i> ${message}"
    ></div>
    `;
    productItem.appendChild(notification);
    SEMICOLON.widget.notifications({ el: jQuery(`#message${product.id}`) });
};

// Notificar agregado o actualización de producto
function destroyCartNotification(message) {
    const cartProductsItems = document.getElementById(`cart-products-items`);
    const notification = document.createElement("div");
    notification.innerHTML = `
    <div 
        id="message"
        data-notify-position="top-right"
        data-notify-type="error"
        data-notify-timeout="5000"
        data-notify-msg="<i class=icon-ok-sign></i> ${message}"
    ></div>
    `;
    cartProductsItems.appendChild(notification);
    SEMICOLON.widget.notifications({ el: jQuery(`#message`) });
};

