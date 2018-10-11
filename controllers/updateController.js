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

function convertDate(dateString) {
    result = moment(dateString).format("YYYY-MM-DD");
    return result;
}

module.exports = {
    update: function(req, res) {
        checkForUpdate(req.params.id);
        res.json("Update Checked");
    }
};

// Functions called within update

function checkForUpdate(userId) {
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
            initializeUpdate(user);
        }
    });
}

// Called First
function initializeUpdate(user) {
    // OctoKit call for user's events
    let username = user.username;
    let per_page = 100;
    let page = 1;

    var created = convertDate(user.createdAt);

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

            if (moment().subtract(1, "days") < moment(created)) {
                extendedRange = convertDate(moment().subtract(30, "days"));
                runUpdates(
                    extendedRange,
                    today,
                    dailyActivityCount,
                    events,
                    userId
                );
            } else {
                runUpdates(
                    lastUpdate,
                    today,
                    dailyActivityCount,
                    events,
                    userId
                );
            }
        });
}

// Called Second
function runUpdates(
    lastUpdate,
    checkedLast,
    dailyActivityCount,
    eventsArray,
    userId
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
                userId
            );
        } else if (eventDay < checkedLast) {
            dailyActivityUpdate(checkedLast, userId, dailyActivityCount);
            dailyActivityCount = 1;
            checkedLast = eventDay;
            eventsArray.shift();
            runUpdates(
                lastUpdate,
                checkedLast,
                dailyActivityCount,
                eventsArray,
                userId
            );
        }
    } else {
        setTimeout(waitForDB, 20000);

        function waitForDB() {
            updateActivityScore(userId);
        }
    }
}

// called third
function dailyActivityUpdate(date, userId, activity) {
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
                dailyActivityUpdate(date, userId, activity)
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
                    createUserDay(day.id, userId, activity);
                } else {
                    updateUserDay(day.id, userId, activity);
                }
            });
        }
    });
}

// create user day relationship
// called fourth
function createUserDay(dayId, userId, activity) {
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
            .then(() => updateUserDay(dayId, userId, activity))
    );
}

// Update Activity for day
// called fifth
function updateUserDay(dayId, userId, activity) {
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
    );
}

// Generate a user's activity score
// called last
function updateActivityScore(userId) {
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
        console.log(
            "::::::::::::::::::::::::::::::::::::CHECKPOINT 6.1::::::::::::::::::::::::::::::::::::"
        );

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
                console.log("success")
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
            return activityScore;
        }
    });
    // update with final activity score
}
