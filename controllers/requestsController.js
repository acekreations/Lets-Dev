const db = require("../models");

module.exports = {
    // Get call for one user's profile page, using id in call paramater
    createRequest: function(req, res) {
        db.Users.findOne({
            where: {
                id: req.params.userId
            }
        }).then(requester =>
            db.Users.findOne({
                where: {
                    id: req.params.friendId
                }
            }).then(newFriend => {
                // Create friendship
                requester.setFriends([newFriend]).then(result => {
                    // add requester field to friendship
                    db.Friendships.update({
                        request_from: requester.username,
                        where: {
                            UserId: requester.id,
                            FriendId: newFriend.id
                        }
                    }).then(result => {
                        // Create friendship (reversed)
                        newFriend.setFriends([requester]).then(result => {
                            // add requester field to friendship
                            db.Friendships.update({
                                request_from: requester.username,
                                where: {
                                    UserId: newFriend.id,
                                    FriendId: requester.id
                                }
                            }).then(result => res.json(result));
                        });
                    });
                });
            })
        );
    },

    // If the Get call fails to return a user, then a post call should be made to create the user with the
    acceptRequest: function(req, res) {
        db.Friendships.update({
            accepted: true,
            where: {
                UserId: req.params.userId,
                FriendId: req.params.friendId
            }
        }).then(firstResult => {
            db.Friendships.update({
                accepted: true,
                where: {
                    UserId: req.params.userId,
                    FriendId: req.params.friendId
                }
            }).then(result => res.json(result));
        });
    },

    getAll: function(req, res) {
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
                let friends = user.Friends[0];
                var friendsArray = [];
                friends.forEach(friend => {
                    if (
                        !friend.Friendship.accepted &&
                        friend.Friendship.request_from != user.username
                    ) {
                        let friendObject = {
                            username: friend.username,
                            fullName: friend.full_name,
                            imgUrl: frined.image,
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
