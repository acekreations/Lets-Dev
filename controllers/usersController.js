const db = require("../models");

module.exports = {
    // Get call for one user's profile page, using id in call paramater
    getUser: function(req, res) {
        db.Users.findOne({
            where: {
                username: req.params.username
            }
        })
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(422).json(err));
    },

    getAll: function(req, res) {
        db.Users.findAll().then(user => res.json(user)).catch(err => res.status(422).json(err))
    },

    findUsers: function(req, res) {
        console.log("searching users")
        console.log(req.params);
        db.Users.findAll({
            where: {
                fullName: {
                    $ilike: "%" + req.params.query + "%"
                }
            }
        })
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(422).json(err));
    },

    // returns a user's friends where friendship has been accepted
    getFriends: function(req, res) {
        db.Users.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: db.Users,
                    as: "Friends"
                }
            ]
        })
            .then(user => {
                let friends = user.Friends;
                var friendsArray = [];
                friends.forEach(friend => {
                    console.log(friend.Friendships.accepted)
                    if (friend.Friendships.accepted) {
                        let friendObject = {
                            userName: friend.username,
                            fullName: friend.fullName,
                            imageUrl: friend.imageUrl,
                            activity: friend.activity,
                            id: friend.id
                        };
                        friendsArray.push(friendObject);
                    }
                })
                res.json(friendsArray);
            })
            .catch(err => res.status(422).json(err));
    }

    // getFriends: function(req, res) {
    //     db.Users.findOne({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [
    //             {
    //                 model: db.Users,
    //                 as: "Friends"
    //             }
    //         ]
    //     })
    //     .then(user => {
    //         let friends = user.Friends;
    //         res.json(friends)
    //     })
    //     .catch(err => res.status(422).json(err))
    // }
};
