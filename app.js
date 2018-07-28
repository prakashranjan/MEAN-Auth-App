const express = require("express");
const path = require("path");
const bodyParser=require("body-parser");
const cors=require("cors");
const passport=require("passport");
const mongoose=require("mongoose");
const config = require("./config/database");

//connect database
mongoose.connect(config.database,{useNewUrlParser: true});

//on connection
mongoose.connection.on("connected" , () => {
    console.log(" connected to database "+config.database);
});

//on error
mongoose.connection.on("error" , (err) => {

    console.log("error is "+ err);
});

const app = express();

const users = require("./routes/users");

//port number development
//const port = 3000;


//port number deployment
const port = process.env.PORT || 8080;

//CORS middleware
app.use(cors());

//set static folder 
app.use(express.static(path.join(__dirname, "public")));

//body-parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);


//index route
app.get( "/" , (req,res) => {
    res.send("Invalid Endpoint");
});

//redirect non-routes to main page 
app.get('*' , (req, res) => {
    res.sendfile(path.join(__dirname,'public/index.html'));

});

//start server
app.listen( port , () => {
    console.log("server started on port "+port);
});