const router = require("express").Router()

const authController = require('../../controllers/authController')
// router.get('/', (req, res) => {
//     res.send("hello from auth.js");
//   });
  

router.post('/', authController.handleLogin);
module.exports = router;