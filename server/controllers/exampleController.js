const db = require("../models");
var express = require("express")
var router = express.Router();

// Create User
db.Users.create({
    username: "aehaq",
    email: "aehaq@gmail.com"
}).then( user => console.log(user) )
.catch( err => console.log(err))

// Create Friendship

db.Users.findOne({
    where: {
        username: "azzihaq"
    }
})
.then( firstUser => 
    
    db.Users.findOne({
        where: {
            username: "aehaq"
        }
    })
    .then( secondUser =>{
        firstUser.setFriends([secondUser])
        secondUser.setFriends([firstUser])
    })
)

// Accept Friend Request

db.Users.findOne({
    where: {
        username: "aehaq"
    }
}).then(function (submitter) {

    db.Friendships.update({
        accepted: true
    }, {
        where: {
            UserId: submitter.id,
            FriendId: 1
        }
    })
    // .then(function (result) {
    //     res.json(result)
    // })

    db.Friendships.update({
        accepted: true
    }, {
        where: {
            UserId: 1,
            FriendId: submitter.id
        }
    })
    // .then(function (result) {
    //     res.json(result)
    // })
})

// Find Friend Requests
db.Friendships.findAll()
.then( result => console.log(result) )
.catch( err => console.log(err) )

// Create Day

// Update Activity for day
function updateActivity( userId, dayId, activity ) {

    db.UsersDays.update({
        activity: activity
    },{
        where: {
            DayId: dayId,
            UserId: userId
        }
    })

}

// create user day relationship
function createUserDay( userId, dayId, activity ) {

    db.Users.findOne({
        where: {
            UserId: userId
        }
    })
    .then( user => 
        db.Days.findOne({
            where: {
                DayId: dayId
            }
        })
        .then( day =>
            user.setDays([day])
        )
        .then( () => 
            updateActivity( userId, dayId, activity )
        )
    )
}

// Activity Tracking

    // Check if Day exists,
        // if not, create day

        // then Check if UsersDays relationship exists
            // if yes
                //insert activity
            
            // if not, 
                //create relationship then insert activity



// module.exports = {
//     getAll: function(req, res) {
//         db.Articles
//         .find({})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     }
// }


// For Days:
// Need to pull the maximum number of events that we can from the octokit api
// For each day, going back 30 days, 
    // check to see if date of each event matches the date we are looking for
        // if it does, increment activity count by one
        // once all have been looped through push (or update) the activity amount on that day to the UsersDays table

module.exports = router;