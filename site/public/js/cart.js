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

            // Limpiamos HTML de pagina de carrito
            const totalPage = document.getElementById("total-cart-page");
            if (totalPage != null) {
                destroytotalCartPage();
            }

            // Actualizar HTML del carrito
            updateAllProducts();

            // Notificamos
            let message = `El producto ${product.name} fue agregado al carrito.`;
            notification(product, message);
        }
        // Actualizar pagina en 2.5s
        setInterval("location.reload()", 2500);
    }

    // Actualizar pagina de carrito
    addProductsCartPage() {
        for (let i = 0; i <= localStorage.length - 1; i++) {
            let key = localStorage.key(i);
            if (key.includes("product")) {
                let product = JSON.parse(localStorage.getItem(key));

                // Mostrar producto en tabla
                addOneProductCartPage(product);
            }
        }
    }

    // Actualizar pagina de checkout
    addProductsCheckoutPage() {
        // Agregar o actualizar carrito
        let index = 0;
        for (let i = 0; i <= localStorage.length - 1; i++) {
            let key = localStorage.key(i);
            if (key.includes("product")) {
                let product = JSON.parse(localStorage.getItem(key));
                index = index + 1;
                console.log(index)
                // Mostrar producto en tabla
                addOneProductCheckoutPage(product, index);
            }
        }
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

        const totalPage = document.getElementById("total-cart-page");
        if (totalPage != null) {
            destroytotalCartPage();
        }

        const totalCheckout = document.getElementById("total-checkout-page");
        if (totalCheckout != null) {
            destroytotalCheckoutPage();
        }

        // Actualizamos carrito
        updateAllProducts();

        // Notificamos
        let message = `Todos los productos fueron quitados del carrito.`;
        destroyCartNotification(message);

        // Actualizar pagina en 2.5s
        setInterval("location.reload()", 2500);
    }

    // Eliminar un producto del carrito
    destroyOneCartProducts() {
        const destroyProductBtn = document.getElementsByClassName(
            "destroy-product-button"
        );
        let products = destroyProductBtn;
        for (let i = 0; i <= products.length; i++) {
            $(products[i]).on("click", function () {
                // Obtenermos producto y lo eliminamos del localStorage
                let key = $(this).data("id");
                let product = JSON.parse(localStorage.getItem(key));
                localStorage.removeItem(`${key}`);

                // Limpiamos HTML del carrito
                destroyAllProductCart();
                destroytotalCart();

                const totalPage = document.getElementById("total-cart-page");
                if (totalPage != null) {
                    destroytotalCartPage();
                }

                const totalCheckout = document.getElementById("total-checkout-page");
                if (totalCheckout != null) {
                    destroytotalCheckoutPage();
                }

                // Actualizamos carrito
                updateAllProducts();

                // Notificamos
                let message = `Un producto ${product.name} fue eliminado del carrito.`;
                destroyCartNotification(message);

                // Actualizar pagina en 2.5s
                setInterval("location.reload()", 2500);
            });
        }
    }
};


// Obtener un producto
async function getOneProduct(id){
    const response = await fetch(`http://${window.env.DOMAIN}/api/products/${id}`);
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
            productsQty = productsQty + 1;
        }
    }

    // Actualizamos totales en localStorage
    if (productsQty != 0) {
        localStorage.setItem("total", total.toFixed(2));
        localStorage.setItem("discount", discount.toFixed(2));
    }

    // Actualizamos contador de productos
    updateCartCounter(productsQty);

    // Mostrar total y descuento
    totalCart(total, discount);

    //Mostrar total y descuento en pagina de carrito
    const totalPage = document.getElementById("total-cart-page");
    if (totalPage != null) {
        totalCartPage(total, discount);
    }
    //Mostrar total y descuento en pagina de checkout
    const totalCheckout = document.getElementById("total-checkout-page");
    if (totalCheckout != null) {
        totalCheckoutPage(total, discount, productsQty);
    }
}

// Mostrar total y descuento en carrito 
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

// Mostrar total y descuento en pagina carrito 
function totalCartPage(total, discount) {
    const totalPage = document.getElementById("total-cart-page");
    console.log(totalPage)

    // Agregamos total
    if(total > 0){ 
        const totalTable = document.createElement("table");
        totalTable.setAttribute("id", "cart-page-table");
        totalTable.classList.add("table", "cart");
        totalTable.innerHTML = `
            <tbody>
                <tr class="cart_item">
                    <td class="cart-product-name">
                        <strong>Subtotal</strong>
                    </td>
                    <td class="cart-product-name">
                        <span class="amount">$${(total + discount).toFixed(2)}</span>
                    </td>
                </tr>
                <tr class="cart_item">
                    <td class="cart-product-name">
                        <strong>Descuento</strong>
                    </td>

                    <td class="cart-product-name">
                        <span class="amount">${discount.toFixed(2)}</span>
                    </td>
                </tr>
                <tr class="cart_item">
                    <td class="cart-product-name">
                        <strong>Total</strong>
                    </td>

                    <td class="cart-product-name">
                        <span class="amount color lead"><strong>$${total.toFixed(2)}</strong></span>
                    </td>
                </tr>
            </tbody>
        `;
        totalPage.appendChild(totalTable);
    } else if(total == 0) {
        const emptyCart = document.createElement("div");
        emptyCart.classList.add("text-center", "mb-5", "mt-2");
        emptyCart.innerHTML = `
            <a href="/store" class="button button-desc button-3d button-rounded button-yellow center">
                Su carrito se encuentra vacio
                <span>Explore nuestra tienda para encontrar excelentes ofertas!</span>
            </a>
        `;
        totalPage.appendChild(emptyCart);
    }
};

// Mostrar total y descuento en pagina carrito 
function totalCheckoutPage(total, discount, productsQty) {
    const totalPage = document.getElementById("total-checkout-page");
    // Agregamos total
    if (total > 0) {
        const totalTable = document.createElement("table");
        totalTable.setAttribute("id", "checkout-page-table");
        totalTable.classList.add("table", "cart");
        totalTable.innerHTML = `
            <tbody>
                <tr class="cart_item">
                    <td class="cart-product-name">
                        <strong>Subtotal</strong>
                    </td>
                    <td class="cart-product-name">
                        <span class="amount">
                            $${(total + discount).toFixed(2)}
                        </span>
                    </td>
                </tr>
                <tr class="cart_item">
                    <td class="cart-product-name">
                        <strong>Descuento</strong>
                    </td>

                    <td class="cart-product-name">
                        <span class="amount">${discount.toFixed(2)}</span>
                    </td>
                </tr>
                <tr class="cart_item">
                    <td class="cart-product-name" col="3">
                        <strong>Total <span class="color">${productsQty}</span> Productos</strong>
                    </td>
                    <td class="cart-product-name" col="3">
                        <span class="amount color lead">
                            <strong>$${total.toFixed(2)}</strong>
                        </span>
                    </td>
                </tr>
                <input type="hidden" name="productsQty" value="${productsQty}" style="display: none;"/>
            </tbody>
        `;
        totalPage.appendChild(totalTable);
    } else if (total == 0) {
        const emptyCart = document.createElement("div");
        emptyCart.classList.add("text-center", "mb-5", "mt-2");
        emptyCart.innerHTML = `
            <a href="/store" class="button button-desc button-3d button-rounded button-yellow center">
                Por el momento no agrego ningún producto
                <span>Explore nuestra tienda para encontrar excelentes ofertas!</span>
            </a>
        `;
        totalPage.appendChild(emptyCart);
    }
};

// Borrar total de carrito
function destroytotalCart() {
    const cartTotal = document.getElementById("cart-total");
    cartTotal.remove();
};

// Borrar total de pagina de carrito
function destroytotalCartPage() {
    const totalPage = document.getElementById("total-cart-page");
    totalPage.remove();
};

// Borrar total de pagina de checkout
function destroytotalCheckoutPage() {
    const totalPage = document.getElementById("total-checkout-page");
    totalPage.remove();
};

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
    productItem.classList.add("cart-panel-product", "d-flex", "align-items-center", "pl-1");
    productItem.setAttribute("id", `cart-product-${product.id}`);
    productItem.innerHTML = `   
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
                ${product.qty} x $${product.price} <small class="text-success mt-0">(-$${ product.discount})</small> = $${((product.price - product.discount) * product.qty).toFixed(2)}
            </span>
        </div>
    `;
    cartProducts.appendChild(productItem);
};

// Agregar un producto a la table de la pagina de carrito
function addOneProductCartPage(product) {
    const cartProductsPage = document.getElementById("cart-products-items-table");
    if(cartProductsPage != null){
        const productItemPage = document.createElement("tr");
        productItemPage.setAttribute("id", `product-item-${product.id}`);
        productItemPage.innerHTML = `
            <td class="">
                <img class="cart-img-animation" src="/images/products/${product.avatar}" width="50">
            </td>
            <td class="">
                ${product.name}
            </td>
            <td class="cart-product-price center">
                <span class="amount">$${(product.price.toFixed(2))}</span>
            </td>
            <td class="cart-product-desc center">
                <span class="amount">$${(product.discount.toFixed(2))}</span>
            </td>
            <td class="cart-product-quantity">
                <div class="quantity">
                    <input type="button" value="-" class="minus rounded-left">
                    <input type="text" id="qty-${product.id}" value="${product.qty}" class="qty" />
                    <input type="button" value="+" class="plus rounded-right">
                </div>
            </td>
            <td class="cart-product-subtotal center">
                <span class="amount">$${((product.price - product.discount) * product.qty).toFixed(2)}</span>
            </td>
            <td class="cart-product-remove center">
                <a class="btn btn-outline-warning btn-sm add-product" data-id="${product.id}">
                    <i class="icon-line-reload add-product" data-id="${product.id}"></i>
                </a>
                <a class="btn btn-outline-warning btn-sm side-panel-trigger">
                    <i class="icon-line-trash-2" style="font-size: 15px;"></i>
                </a>
            </td>
            `;
        cartProductsPage.appendChild(productItemPage);
    }
};

// Agregar un producto a la table de la pagina de checkout
function addOneProductCheckoutPage(product, index) {
    const checkoutProductsPage = document.getElementById("checkout-products-items-table");
    if(checkoutProductsPage != null){
        const productItemPage = document.createElement("tr");
        productItemPage.setAttribute("id", `product-item-${product.id}`);
        productItemPage.innerHTML = `  
            <td>
                <img class="cart-img-animation" src="/images/products/${product.avatar}" width="30">
            </td>
            <td class="">${product.name}</td>
            <td class="cart-product-price center">
                <span class="amount">$${(product.price.toFixed(2))}</span>
            </td>
            <td class="cart-product-desc center">
                <span class="amount">$${(product.discount.toFixed(2))}</span>
            </td>
            <td class="cart-product-quantity">
                <span class="amount">${product.qty}</span>
            </td>
            <td class="cart-product-subtotal center">
                <strong class="color">$${((product.price - product.discount) * product.qty).toFixed(2)}</strong>
            </td>
            <input type="hidden" name="product${index}" value="${product.id}" style="display: none;"/>
            <input type="hidden" name="qty${index}" value="${product.qty}" style="display: none;"/>
            `;
        checkoutProductsPage.appendChild(productItemPage);
    }
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

