const db = require("../models");

module.exports = {
    getAll: function(req, res) {
        db.Articles
        .find({})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}