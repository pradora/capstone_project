const router = require("express").Router()

const logoutController = require('../../controllers/logoutController')
// router.get('/', (req, res) => {
//     res.send("hello from auth.js");
//   });
  

router.get('/', logoutController.handleLogout);
module.exports = router;