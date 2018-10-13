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

    findUsers: function(req, res) {
        db.Users.findAll({
            like: {
                fullName: {
                    $ilike: '%'+req.params.query+'%'
                }
            }
        })
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(422).json(err));
    },

    // If the Get call fails to return a user, then a post call should be made to create the user with the
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
                    console.log("request accepted (get friends)")
                    console.log(friend.Friendships.accepted)
                    if (friend.Friendships.accepted) {
                        let friendObject = {
                            userName: friend.username,
                            fullName: friend.fullname,
                            imgUrl: frined.imageUrl,
                            activity: friend.activity,
                            id: friend.id
                        };
                        friendsArray.push(friendObject);
                    }
                })
                .then( () => {
                    console.log(friendsArray);
                    res.json(friendsArray);
                })
            })
            .catch(err => res.status(422).json(err));
    }
};
