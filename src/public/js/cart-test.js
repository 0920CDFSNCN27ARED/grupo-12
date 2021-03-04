window.addEventListener('load', function() {

    let addButton = document.getElementsById("addProductCart");
    
    addButton.addEventListener("click",function(){
        let productId = addButton.dataset.id;
        getOneProduct(productId)
    })
    
    async function getOneProduct(id){
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        let product = await response.json();
        console.log(product.data);
    }
})