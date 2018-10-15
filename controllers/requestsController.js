const db = require("../models");

module.exports = {
    // Get call for one user's profile page, using id in call paramater
    createRequest: function(req, res) {
        db.Friendships.create({
            UserId: req.body.userId,
            FriendId: req.body.friendId,
            request_from: req.body.userId
        }).then(result => {
            db.Friendships.create({
                UserId: req.body.friendId,
                FriendId: req.body.userId,
                request_from: req.body.userId
            }).then(result => res.json(result));
        });
    },

    // If the Get call fails to return a user, then a post call should be made to create the user with the
    acceptRequest: function(req, res) {
        console.log(req.body);
        db.Friendships.update(
            {
                accepted: true
            },
            {
                where: {
                    UserId: req.body.userId,
                    FriendId: req.body.friendId
                }
            }
        ).then(firstResult => {
            console.log("first complete");
            db.Friendships.update(
                {
                    accepted: true
                },
                {
                    where: {
                        UserId: req.body.friendId,
                        FriendId: req.body.userId
                    }
                }
            ).then(result => res.json(result));
        });
    },

    getAll: function(req, res) {
        console.log("request being made");
        console.log("attempting to fetch user with friends");
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
                    console.log(friend.Friendships.accepted);
                    if (
                        !friend.Friendships.accepted &&
                        friend.Friendships.request_from != req.params.id
                    ) {
                        let friendObject = {
                            username: friend.username,
                            fullName: friend.fullName,
                            imgUrl: friend.imageUrl,
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
