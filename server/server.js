const express = require("express");
const routes = require("./routes")
// const routes = require("./controllers/dbController")

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;



if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
//commented out because it throws err until there are models

db.sequelize.sync().then(function () {
    app.listen(PORT, function(){
        console.log(`Listening on port ${PORT}`);
    })
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("../client/public"));

app.use(routes)