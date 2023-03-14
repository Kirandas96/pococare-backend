const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// coonection to mongo
const connection=require("./db")

// model
const UserModel = require("./loginSignup/Login.model");

// route import
const authRouter = require("./loginSignup/login.route");
const UserRouter=require("./Users/user.roue");
const tokenValidator = require("./utils/tokenValidator");

// local port
const port = process.env.PORT || 8080;

// cors
var allowedOrigins = ["pococare-frontend-d2vh0r3q2-kirandas96.vercel.app"];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/auth", authRouter)
app.use("/api",tokenValidator,UserRouter)
app.get("/", (req, res) => {
    res.send("user info")
  })

//   server

  app.listen(port, async () => {
    try {
      await connection;
      console.log("connected to db successfully");
    } catch(e){
      console.log(e);
      console.log("something went wrong while connecting to db");
    }
    console.log(`Server listening on localhost:${port}`)
  });



























































































