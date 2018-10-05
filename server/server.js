const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("../client/public"));

app.use(routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
//commented out because it throws err until there are models
//const db = require("./models");

app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
})