const createProduct = require("../db/productData/createProduct")
const getAllProducts = require("../db/productData/getAllProducts")
const getSingleProduct = require("../db/productData/getSingleProduct.js")
const createNewProduct = async (req, res, next) => {
    try {
        const product = await createProduct(req);
        res.status(201).send(product);
    } catch (err) {
        next(err);
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products);
    } catch (err) {
        next(err);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const product = await getSingleProduct(req.params.id);
        console.log(product);
        res.send(product);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNewProduct,
    getAllProduct,
    getProduct,
}