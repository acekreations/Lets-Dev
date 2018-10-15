const db = require("../models");
var moment = require("moment");

const octokit = require("@octokit/rest")();

// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
octokit.repos
    .getForOrg({
        org: "octokit",
        type: "public"
    })
    .then(({ data, headers, status }) => {
        // handle data
    });

octokit.authenticate({
    type: "oauth",
    key: "9988a9f4ea38fbb0c35e",
    secret: "f941956fb880afd903d41e1558009974a317f28a"
});

function convertDate(dateString) {
    result = moment(dateString).format("YYYY-MM-DD");
    return result;
}

module.exports = {
    updateNew: function(req, res) {
        updateNew(req.params.id, res);
    },

    checkForUpdate: function(req, res) {
        checkForUpdate(req.params.id, res);
    },

    compileActivity: function(req, res) {
        updateActivityScore(req.params.id, res);
    }
};

// Functions called within update

function updateNew(userId, res) {
    console.log(
        "::::::::::::::::::::::::::::::::::::CHECKPOINT 0.0::::::::::::::::::::::::::::::::::::"
    );

    db.Users.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        const username = user.username;

        octokit.activity
            .getEventsForUser({ username, per_page, page })
            .then(result => {
                console.log(
                    "::::::::::::::::::::::::::::::::::::CHECKPOINT 1.0::::::::::::::::::::::::::::::::::::"
                );

                const range = convertDate(moment().subtract(30, "days"));
                const today = convertDate(moment());
                let dailyActivityCount = 0;
                const events = result.data;

                runUpdates(
                    range,
                    today,
                    dailyActivityCount,
                    events,
                    userId,
                    res
                );
            });
    });
}

function checkForUpdate(userId, res) {
    console.log(
        "::::::::::::::::::::::::::::::::::::CHECKPOINT 0.0::::::::::::::::::::::::::::::::::::"
    );
    db.Users.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        var lastUpdate = convertDate(user.updatedAt);

        // If user has not been updated in the last day, run update
        if (moment().subtract(1, "days") < moment(lastUpdate)) {
            initializeUpdate(user, userId, lastUpdate, res);
        } else {
            res.json("No Update Necessary");
        }
    });
}

// Called First
function initializeUpdate(user, userId, lastUpdate, res) {
    // OctoKit call for user's events
    let username = user.username;
    let per_page = 100;
    let page = 1;

    octokit.activity
        .getEventsForUser({ username, per_page, page })
        .then(result => {
            console.log(
                "::::::::::::::::::::::::::::::::::::CHECKPOINT 1.0::::::::::::::::::::::::::::::::::::"
            );
            console.log(result.data[0]);
            const events = result.data;
            var today = convertDate(moment());
            var dailyActivityCount = 0;

            runUpdates(
                lastUpdate,
                today,
                dailyActivityCount,
                events,
                userId,
                res
            );
        });
}

// Called Second
function runUpdates(
    lastUpdate,
    checkedLast,
    dailyActivityCount,
    eventsArray,
    userId,
    res
) {
    console.log(
        "::::::::::::::::::::::::::::::::::::CHECKPOINT 2.0::::::::::::::::::::::::::::::::::::"
    );
    console.log(
        `last update: ${lastUpdate} \n checkedLast: ${checkedLast} \n activityCount: ${dailyActivityCount} \n firstEvent: ${
            eventsArray[0]
        } \n numberOfEvents: ${eventsArray.length}`
    );
    if (lastUpdate <= checkedLast) {
        let eventDay = convertDate(eventsArray[0].created_at);
        if (eventDay === checkedLast) {
            dailyActivityCount += 1;
            eventsArray.shift();
            runUpdates(
                lastUpdate,
                checkedLast,
                dailyActivityCount,
                eventsArray,
                userId,
                res
            );
        } else if (eventDay < checkedLast) {
            const updateDay = async () => {
                // calculates activity score
                const res = await dailyActivityUpdate(
                    checkedLast,
                    userId,
                    dailyActivityCount,
                    res
                );

                dailyActivityCount = 1;
                checkedLast = eventDay;
                eventsArray.shift();
                runUpdates(
                    lastUpdate,
                    checkedLast,
                    dailyActivityCount,
                    eventsArray,
                    userId,
                    res
                );
            };

            updateDay();
        }
    } else {
        return res.json("complete");
    }
}

// called third
function dailyActivityUpdate(date, userId, activity, res) {
    console.log(
        "::::::::::::::::::::::::::::::::::::CHECKPOINT 3.0::::::::::::::::::::::::::::::::::::"
    );
    console.log(
        `date: ${date} \n userId: ${userId} \n activity: ${activity} \n `
    );
    // Check if Day exists
    db.Days.findOne({
        where: {
            date: date
        }
    }).then(day => {
        // if not
        if (!day) {
            db.Days.create({
                date: date
            }).then(() =>
                // Rerun function
                dailyActivityUpdate(date, userId, activity, res)
            );
        } else {
            // Check if UsersDays relationship exists
            db.UsersDays.findOne({
                where: {
                    UserId: userId,
                    DayId: day.id
                }
            }).then(userDay => {
                //if not
                if (!userDay) {
                    createUserDay(day.id, userId, activity, res).then(
                        response => {
                            return response;
                        }
                    );
                } else {
                    updateUserDay(day.id, userId, activity, res).then(
                        response => {
                            return response;
                        }
                    );
                }
            });
        }
    });
}

// create user day relationship
// called fourth
function createUserDay(dayId, userId, activity, res) {
    console.log(
        "::::::::::::::::::::::::::::::::::::CHECKPOINT 4.0::::::::::::::::::::::::::::::::::::"
    );
    console.log(
        `dayId: ${dayId} \n userId: ${userId} \n activity: ${activity} \n `
    );

    db.Users.findOne({
        where: {
            id: userId
        }
    }).then(user =>
        db.Days.findOne({
            where: {
                id: dayId
            }
        })
            .then(day => user.setDays([day]))
            .then(res => updateUserDay(dayId, userId, activity, res))
    );
}

// Update Activity for day
// called fifth
function updateUserDay(dayId, userId, activity, res) {
    console.log(
        "::::::::::::::::::::::::::::::::::::CHECKPOINT 5.0::::::::::::::::::::::::::::::::::::"
    );
    console.log(
        `dayId: ${dayId} \n userId: ${userId} \n activity: ${activity} \n `
    );

    db.UsersDays.update(
        {
            activity: activity
        },
        {
            where: {
                DayId: dayId,
                UserId: userId
            }
        }
    ).then(res => {
        return res;
    });
}

// Generate a user's activity score
// called last
function updateActivityScore(userId, res) {
    console.log(
        "::::::::::::::::::::::::::::::::::::CHECKPOINT 6.0::::::::::::::::::::::::::::::::::::"
    );
    console.log(`userId: ${userId} \n`);
    db.UsersDays.findAll({
        include: [{ model: db.Days }],
        where: {
            UserId: userId
        }
    }).then(result => {
        const update = async () => {
            // calculates activity score
            const activityScore = await compoundActivity(result);

            //
            db.Users.update(
                {
                    activity: activityScore
                },
                {
                    where: {
                        id: userId
                    }
                }
            ).then(finalResult =>
                // res.json(finalResult)
                res.json(finalResult)
            );
        };
        update();
    });
}

function compoundActivity(array) {
    console.log(
        "::::::::::::::::::::::::::::::::::::CHECKPOINT 6.1::::::::::::::::::::::::::::::::::::"
    );

    //Increment activity score for each entry for the last 30 days
    let stopPoint = moment().subtract(30, "days");
    let activityScore = 0;
    array.forEach(element => {
        let date = convertDate(element.Day.dataValues.date);
        console.log(date);
        if (moment(date) > moment(stopPoint)) {
            activityScore += element.activity;
        } else if (
            moment(date) === moment(stopPoint) ||
            array.indexOf(element) === array.length - 1
        ) {
            activityScore += element.activity;
        }
    });
    return activityScore;
    // update with final activity score
}
