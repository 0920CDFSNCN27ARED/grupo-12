class Cart{

    // Agregar un producto al carrito
    async addProduct(e){
        
        if(e.target.classList.contains('add-product')){
            const productId = e.target.dataset.id;
            const product = await getOneProduct(productId);
            
            if(localStorage.getItem(`product-${productId}`) == `product-${productId}`){
                let count =  parseInt(localStorage.getItem(`product-${productId}-count`))
                count = count +1;
                localStorage.setItem(`product-${productId}-count`, count)
            } else {
                localStorage.setItem(`product-${productId}`, JSON.stringify(product))
                localStorage.setItem(`product-${productId}-count`, 1)
            }
            

            // const product = e.target.classList.contains('add-product').dataset.id;
            // console.log(product);
        }
    }
}

async function getOneProduct(id){
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    let product = await response.json();
    return product.data;
}