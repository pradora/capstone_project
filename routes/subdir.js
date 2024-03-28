const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/', (req, res) => {
  res.send('hello, world!');
});

router.get(/^\/(index(\.html)?)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

router.get(/^\/test(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});

// router.use("/product", require("./api/product"));
// router.use("/user", require("./auth/user"));
// router.use("/product", require(".routes/api/product")); // Include product route here
// router.use("/user", require(".routes/auth/user"));
// Import the product router
// const productRouter = require('./api/product');
// Use the product router under the '/api' path
// router.use("/api", require("./routes/api/index"))


module.exports = router;