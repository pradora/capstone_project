const router = require("express").Router()

const refreshTokenController = require('../../controllers/refreshTokenController')
// router.get('/', (req, res) => {
//     res.send("hello from auth.js");
//   });
  

router.get('/', refreshTokenController.handleRefreshToken);
module.exports = router;