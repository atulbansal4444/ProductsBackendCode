const mongoose = require('mongoose');
const Product = require('./models/products');

mongoose
    .connect('mongodb+srv://atulbansaldev:Password1@cluster0.5pxe4hp.mongodb.net/product_test?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to DB!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });

    const result = await createdProduct.save();

    res.json(result);
};

const getProducts = async (req, res, next) => {
    let products = await Product.find().exec();

    res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
