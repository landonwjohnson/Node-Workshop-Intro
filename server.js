const express = require('express');
var bodyParser = require('body-parser');
var server = express();

server.use(bodyParser.json());
var port = 3000;

var products = [
    {
        id: 1,
        name: 'iPad',
        price: 329.99
    },
    { 
        id: 2, 
        name: 'iPhone X',
        price: 999.99
    }
];

server.get('/api/products', function(request, response) {

    response.status(200).json(products);
});

server.get('/api/products/:productId', (req, res) => {
    var id = Number(req.params.productId);
    console.log(typeof id);

    var product = products.find(function(product) {
        return product.id === id;
    });
    if (product) {
        res.status(200).json(product);
    } else {
        res
            .status(404)
            .json({ message: `The product with id: ${id} does not exist.`})
    }
})

server.post('/api/products', (req, res) => {
    console.log(req.body)
    products.push(req.body);
    res.status(201).json(products);
});

server.listen(port, () => {
    console.log(`running on port ${port}`);
});


