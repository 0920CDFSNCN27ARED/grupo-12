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

app.all('/example', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'view/example.html'));
});


app.all('/prueba', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'view/prueba.html'));
});
