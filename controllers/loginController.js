const db = require("../models");
var express = require("express")
// var router = express.Router();

module.exports = {
    // When you log in to the site, a call to this function will be made to get all of the users information.
    // When we return to the front end, we will save the user's information in the session/cookies.
    getUser: function(req, res) {
        db.Users
        .findOne({
            where: {
                username: req.params.username
            }
        })
        .then(user => {
            res.json(user)
        })
        .catch(err => res.status(422).json(err));
    },

    // If the Get call fails to return a user, then a post call should be made to create the user with the 
    createUser: function(req, res) {
        db.Users
        .create(req.body)
        .then( user => {
            res.json(user)
        })
        .catch(err => res.status(422).json(err));
    }
}