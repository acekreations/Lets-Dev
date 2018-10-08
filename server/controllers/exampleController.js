const db = require("../models");
var express = require("express")
var router = express.Router();

db.User.create({
    userName: "aehaq",
    email: "azfarehaq@gmail.com"
}).then( user => console.log(user))

// module.exports = {
//     getAll: function(req, res) {
//         db.Articles
//         .find({})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     }
// }

module.exports = router;