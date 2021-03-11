class CartPage {
    // Obtener productos en pagina de carrito al recargar
    updateCartPage() {
        updateProductsCartPage();
    }
};

// Actualizar productos en pagina de carrito
function updateProductsCartPage() {
    let total = 0;
    let discount = 0;
    let productsQty = 0;
    // Agregar o actualizar carrito
    for (let i = 0; i <= localStorage.length - 1; i++) {
        let key = localStorage.key(i);
        if (key.includes("product")) {
            let product = JSON.parse(localStorage.getItem(key));

            // Mostrar producto
            const tableProducts = document.getElementById("cart-page-table-products");
            alert(tableProducts);
            updateProductCartPage(product, tableProducts);

            // Calcular total
            total = (product.price - product.discount) * product.qty + total;

            // Calcular total
            discount = product.discount * product.qty + discount;
            productsQty = productsQty +1;
        }
    }
};

// Actualizar producto el la pagina de carrito
function updateProductCartPage(product, tableProducts) {
    const productItem = document.createElement("tr");
    productItem.classList.add(`product-${product.id}`)
    productItem.innerHTML = `
    <td class="">
        <img class="cart-img-animation" src="/images/products/${product.avatar}" width="50">
    </td>
    <td class="">
        ${product.name}
    </td>
    <td class="cart-product-price center">
        <span class="amount">$${product.price}</span>
    </td>
    <td class="cart-product-desc center">
        <span class="amount">$${product.discount}</span>
    </td>
    <td class="cart-product-quantity">
        <div class="quantity">
            <input type="button" value="-" class="minus rounded-left">
            <input type="text" id="qty-${product.id}" value="${product.qty}" class="qty" />
            <input type="button" value="+" class="plus rounded-right">
        </div>
    </td>
    <td class="cart-product-subtotal center">
        <span class="amount">$${product.total}</span>
    </td>
    <td class="cart-product-remove center">
        <a class="product-delete-cart destroy-product-button" data-id="product-${product.id}" 
            title="Remove this item"><i class="icon-trash1" style="font-size: 20px;"></i></a>
    </td>
    `;
    tableProducts.appendChild(productItem);
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

