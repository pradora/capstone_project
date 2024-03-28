const fs = require('fs');
const path = require('path');
const router = require("express").Router();

router.get("/robots.txt", (req, res) => {
//     try {
//         const filePath = path.join(__dirname, "./public/text/", "robots.txt");
//         const rs = fs.createReadStream(filePath, { encoding: "utf8" });

//         // Stream the file content to the response
//         rs.pipe(res);

//         // Handle any errors that occur while streaming
//         rs.on("error", err => {
//             console.error(err);
//             res.status(500).send("Internal Server Error");
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// });

module.exports = router;