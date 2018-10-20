# Lets_Dev

Lets Dev is a social accountability platform for developers that tracks your Github activity and then ranks you against your friends to help keep everyone coding.

[Live Site](https://letsdev.herokuapp.com/)

![](screenshots/home.png)

## Tech Stack

-   React
    -   React Router Dom
    -   React Cookie
    -   Axios
-   UIkit
-   Node.js
    -   Sequelize
    -   Octokit
-   Express
-   Github Authorization
-   Postgres
-   Heroku

## Frontend

The frontend is built entirely with React, along with React Router and UIkit. The design is purposefully kept very minimal to focus the user their rank and stats.

We choose to use React specifically because we have many repeating elements, including your stats, the nav bar and lists of other users. You can see our final pages and compoentes in the file tree below.

![](screenshots/pages-comps.png)

Additionaly we used Axios to make our API calls from the frontend to the back. As you can see we ended up with quite a few.

```
    getUserProfile: function(username) {
        return axios.get("/api/users/" + username);
    },
    getAllUsers: function() {
        return axios.get("/api/users/");
    },
    displayFriends: function(id) {
        return axios.get("/api/friends/" + id);
    },
    checkUpdates: function(id) {
        return axios.post("/api/updateCheck/" + id);
    },
    updateNew: function(id) {
        return axios.post("/api/updateNew/" + id);
    },
    compileActivity: function(id) {
        return axios.post("/api/compileUpdate/" + id);
    },
    createRequest: function(req) {
        //post obj to req.body. user id friend id
        return axios.post("/api/request", req);
    },
    acceptRequest: function(req) {
        //post obj to req.body. user id friend id
        return axios.put("/api/request", req);
    },
    displayRequests: function(id) {
        return axios.get("/api/request/" + id);
    },
    login: function(username) {
        return axios.get("/api/login/" + username);
    },
    signUp: function(req) {
        return axios.post("/api/signup", req);
    },
    search: function(query) {
        return axios.get("api/search/" + query);
    }
```

## Authors

[Laura Lee](https://github.com/lalatw)

[Azfar Haq](https://github.com/aehaq)

[Craig Melville](https://github.com/acekreations)
