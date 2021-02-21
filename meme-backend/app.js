//importing all dependencies for this project
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "/.env" });

const bodyParser = require("body-parser");
const cors = require("cors");

//importing route for meme
const memeRoute = require("./routes/meme");

const app = express();
const swaggerApp = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
swaggerApp.use(cors());
swaggerApp.use(bodyParser.json());

//Swagger documentation
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "XMeme API",
      description:
        "This is a REST API made with Express and Node JS which stores, fetches, updates, deletes memes with urls",
      contact: {
        name: "Souvik Jana",
        url: "https://sjsouvik.netlify.app",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8081",
        description: "Development server",
      },
    ],
  },
  //paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

swaggerApp.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //to run the swagger on different port than the port that are being used to run the app 
// app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //to run the swagger on the same port that are being used to run the app

//My Route
app.use("/memes", memeRoute);

app.get("/", (req, res) => res.send("Hello from the share-meme backend"));

//Port
const port = process.env.PORT || 8081;
const swaggerPort = 8080;

//Connect to DB
const connectionString = "mongodb://localhost:27017/test"; //for testing locally on AWS EC2
//const connectionString = process.env.MONGODB_URI;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log("Coudn't Connect to DB", error));

//Starting the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
swaggerApp.listen(swaggerPort, () =>
  console.log(`Swagger is running on port ${swaggerPort}`)
); //to run swagger on port 8080 locally
