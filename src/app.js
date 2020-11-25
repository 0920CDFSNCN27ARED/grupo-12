const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('The server is running on port 3000');
});

app.all('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'view/index.html'));
});

app.all('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'view/login.html'));
});

app.all('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'view/register.html'));
});

app.all("/register/confirm", (req, res) => {
    res.sendFile(path.resolve(__dirname, "view/confirmation.html"));
});

app.all('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'view/productDetail.html'));
});

app.all('/productCart', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'view/productCart.html'));
});

app.all("/store", (req, res) => {
    res.sendFile(path.resolve(__dirname, "view/store.html"));
});

app.all('/checkout', (req, res) => {
    res.sendFile(path.resolve(__dirname, "view/checkout.html"));
});

app.all("/single-product", (req, res) => {
    res.sendFile(path.resolve(__dirname, "view/single-product.html"));
});

app.all("/contact", (req, res) => {
    res.sendFile(path.resolve(__dirname, "view/contact.html"));
});

app.all("/story", (req, res) => {
    res.sendFile(path.resolve(__dirname, "view/story.html"));
});

app.all("/forgot", (req, res) => {
    res.sendFile(path.resolve(__dirname, "view/forgot.html"));
});

app.get("/productos/:id", (req, res) => {
    res.send("bienvenidos al detalle del producto" + " "+ req.params.id)
})

app.get("/productos/:idProductos/comentario/:idComentario?", (req, res) => {
    if(req.params.idComentario == undefined){
        res.send("bienvenido a los comentarios de mi producto" + " "+req.params.idProductos )
 }else
    res.send("bienvenido a los comentarios de mi producto" + " "+req.params.idProductos + "y estas enfocado en comentario" + req.params.idComentario)
})