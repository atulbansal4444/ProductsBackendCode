const { MongoClient } = require('mongodb');

const url = "mongodb+srv://atulbansaldev:Password1@cluster0.5pxe4hp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const createProduct = async (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };

    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db('product_test');
        const result = await db.collection('products').insertOne(product);
    } catch (error) {
        return res.json({message: 'could not store data.'});
    }

    client.close();

    res.json(product);
};

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url);

    let products;
    
    try {
        await client.connect();
        const db = client.db('product_test');
        products = await db.collection('products').find().toArray();
    } catch (error) {
        return res.json({message: 'could not retrieve data.'});
    }

    client.close();

    res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
