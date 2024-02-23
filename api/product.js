const router = require("express").Router()

router.get("/product", (req, res) => {
    res.send("these are products")
});

module.exports = router