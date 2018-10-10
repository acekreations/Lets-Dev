const db = require("../models");
var express = require("express")
var router = express.Router();
var moment = require('moment')

function convertDate(dateString) {
    result = moment(dateString).format('YYYY-MM-DD');
    return result
}

// Create User
db.Users.create({
    username: "aehaq",
    email: "aehaq@gmail.com"
}).then( user => console.log(user) )
.catch( err => console.log(err))

// Create User
db.Users.create({
    username: "azzihaq",
    email: "azzihaq@gmail.com"
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
        secondUser.setFriends([firstUser])
        firstUser.setFriends([secondUser])
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
// called fifth
function updateUserDay( dayId, userId, activity ) {

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
// called fourth
function createUserDay( dayId, userId, activity ) {

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
            updateUserDay( dayId, userId, activity )
        )
    )
}

// called third
function dailyActivityUpdate( date, userId, activity ){
    // Check if Day exists
    db.Days.findOne({
        where: {
            date: date
        }
    }).then( day => {
        // if not
        if ( !day ) {
            db.Days.create({
                date: date
            }).then( () =>
                // Rerun function
                dailyActivityUpdate( date, userId, activity) 
            )
        } else {
            // Check if UsersDays relationship exists
            db.UsersDays.findOne({
                where: {
                    UserId: userId,
                    DayId: day.id
                }
            }).then( userDay => {
                //if not
                if( !userDay ) {
                    createUserDay( day.id, userId, activity )
                } else {
                    updateUserDay( day.id, userId, activity )
                }
            })
        }
    })
}

// Called First
function checkForUpdate( userId ) {
    db.Users.findOne({
        where: {
            UserId: userId
        }
    }).then( user => {
        // OctoKit call goes here
        var today = convertDate(moment());
        var lastUpdate = convertDate(user.updatedAt)
        var dailyActivityCount = 0;
        runUpdates( lastUpdate, today, dailyActivityCount, events, userId)
    })
}

// Called Second
function runUpdates( lastUpdate, checkedLast, dailyActivityCount, eventsArray, userId ) {
    if ( lastUpdate < checkedLast ) {
        let eventDay = convertDate(eventsArray[0].created_at)
        if ( eventDay === checkedLast ) {
            dailyActivityCount += 1;
            eventsArray.shift();
            runUpdates( lastUpdate, checkedLast, dailyActivityCount, eventsArray, userId )
        } else if (eventDay < checkedLast) {
            dailyActivityUpdate( eventDay, userId, dailyActivityCount )
            dailyActivityCount = 1;
            checkedLast = eventDay;
            eventsArray.shift();
            runUpdates( lastUpdate, checkedLast, dailyActivityCount, eventsArray, userId )
        }
    } else {
        updateActivityScore( userId )
    }
}

// Generate a user's activity score
function updateActivityScore( userId ) {
    db.UsersDays.findAll({
        where: {
            UserId: userId
        },
        include: [{
            model: 'Days',
            as: 'day'
        }]
    })
    .then( result => {
        console.log(result)
        let activityScore = 0;
        let earliestDay =  moment().subtract('days', 30);
        result.forEach(element => {
            let date = convertDate(element.day.date)
            if (date > earliestDay ) {
                activityScore += element.activity
            } else if (date === earliestDay || result.indexOf(element) === result.length - 1) {
                activityScore += element.activity
                // update with final activity score
                db.Users.update({
                    activity: activityScore
                } , {
                    where: {
                        UserId: userId
                    }
                }).then( finalResult =>
                    res.json(finalResult)
                )
            }
        })
    })
}

// module.exports = {
//     getAll: function(req, res) {
//         db.Articles
//         .find({})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     }
// }

// check if user id stored in session matches userid of profile page being visited
// through findOne user

// module.exports = {
//     // all functions go here

// };

module.exports = router