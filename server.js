const express = require("express");
const app = express();
const fs = require('fs')

const path = require("path")
const cors = require("cors");
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3000;

// custom middleware logger
app.use(logger)

// Handle options credentials check -before CORS!
// and fetch cookies credentails requirement
app.use(credentials)

//cross origin resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data,
// form data: "content-type: application/x-www-form-urlenoded"
app.use(express.urlencoded({ extended: false }))

// build-in middleware for json
app.use(express.json());

//middlware for cookies
app.use(cookieParser())

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')))
// 
app.use('/subdir', express.static(path.join(__dirname, 'public')))



// backend routes
app.use("/product", require("./routes/api/product"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));

//  app.use("/api", require("./routes/api"));
// app.use("/auth", require("./routes/auth"));
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'));

// routes that need verification
app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'));



app.get("/robots.txt", (req, res) => {
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


// app.all('*', (req, res) => {
//   res.status(404);
//   if (req.accepts('html')) {
//     res.sendFile(path.join(__dirname, 'views', '404.html'));
//   } else if (req.accepts('json')) {
//     res.json({ error: "404 Not Found" })
//   } else {
//     res.type('txt').send("404 Not Found")
//   }
// })

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