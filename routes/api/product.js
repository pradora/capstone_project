const router = require("express").Router()
const {
  createNewProduct,
  getAllProduct,
  getProduct,
} = require("../../controllers/productController.js")
// const createProduct = require("../../db/productData/createProduct.js")
// const getAllProducts = require("../../db/productData/getAllProducts.js")
// const getSingleProduct = require("../../db/productData/getSingleProduct.js")

// router.use("/", require("./product"));

router.route('/')
  .post(createNewProduct)
  .get(getAllProduct)

router.route('/product/:id')
  .get(getProduct)





// router.get("/product", (req, res) => {
//     res.send("these are products")
// });

// post product
// router.post("/product", async (req, res, next) => {
//     try {
//       const product = await createProduct(req);
//       res.status(201).send(product);
//     } catch (err) {
//       next(err);
//     }
//   });

// get all products
// router.get("/products", async (req, res, next) => {
//     try {
//       const products = await getAllProducts();
//       res.send(products);
//     } catch (err) {
//       next(err);
//     }
//   });

// get product by id
// router.get("/products/:id", async (req, res, next) => {
//   try {
//     const product = await getSingleProduct(req.params.id);
//     console.log(product);
//     res.send(product);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router