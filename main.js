const express = require("express");
const app = express();
const PORT = process.env.PORT||3000;
const path = require("path")
const cors = require("cors");
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')

const fs = require('fs')

// custom middleware logger
app.use(logger)

// built-in middleware to handle urlencoded data
// form data: "content-type: application/x-www-form-urlenoded"
app.use(express.urlencoded({extended:false}))

// build-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')))

// third-party middleware, cross origin resource sharing
const whitelist = ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://www.sitedomain.com']
const corsOptions = {
  origins: (origin, callback) => {        //remove !origin after development
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback (new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// backend routes
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

// exit on uncaught errors
process.on("uncaughtException", err => {
  console.error(`There was an uncaught error: ${err}`)

  process.exit(1);
})



// Define a router for serving robots.txt
const router = express.Router();
router.get("/robots.txt", (req, res) => {
  try {
    const filePath = path.join(__dirname, "./public/text/", "robots.txt");
    const rs = fs.createReadStream(filePath, { encoding: "utf8" });

    // Stream the file content to the response
    rs.pipe(res);

    // Handle any errors that occur while streaming
    rs.on("error", err => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Mount the router on the root path
app.use("/", router);

app.all('*', (req, res) =>{
  res.status(404);
  if (req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json ({error: "404 Not Found"})
  } else {
    res.type('txt').send("404 Not Found")
  }
})

// exit on uncaught errors
process.on("uncaughtException", err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});

// express already handles errors, add custom error handling
app.use(errorHandler)

// start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
}

module.exports = app;