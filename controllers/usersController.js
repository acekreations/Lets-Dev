const db = require("../models");

module.exports = {
    // Get call for one user's profile page, using id in call paramater
    getUser: function(req, res) {
        db.User.find({
            where: {
                username: req.params.username
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
            .then(result => {
                let friends = result.Friends[0];
                var friendsArray = [];
                friends.forEach(friend => {
                    if (friend.Friendship.accepted) {
                        let friendObject = {
                            userName: friend.username,
                            fullName: friend.fullname,
                            imgUrl: frined.imageUrl,
                            activity: friend.activity,
                            id: friend.id
                        };
                        friendsArray.push(friendObject);
                    }
                });
                res.json(friendsArray);
            })
            .catch(err => res.status(422).json(err));
    }
};
