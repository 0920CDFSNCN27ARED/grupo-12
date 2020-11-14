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

