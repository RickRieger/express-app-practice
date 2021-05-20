const express = require("express");
//for development only
const logger = require("morgan");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const productRouter = require("./routes/productRouter");

const app = express();
//set views 
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

//middleware-giving app abilities
app.use(logger("dev"));
//reading incoming data
app.use(express.json());
// anything static, go to public folder
app.use(express.static(path.join(__dirname, "public")));
// if anyone goes here, take them to teamRouter(default path)
app.use("/", indexRouter);
// if anyone goes here, take them to teamRouter
app.use("/api/product", productRouter);

app.listen(3000, function () {
  console.log(`Server is running on PORT: ${3000}`);
});