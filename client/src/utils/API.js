import axios from "axios";

export default {
    getUserProfile: function(id) {
        return axios.get("/api/users/" + id);
    },
    displayFriends: function(id) {
        return axios.get("/api/friends/" + id);
    },
    updateActivity: function(id) {
        return axios.get("/api/update/" + id);
    },
    createRequest: function() {
        //post obj to req.body. user id friend id
        return axios.post("/api/request");
    },
    acceptRequest: function() {
        //post obj to req.body. user id friend id
        return axios.put("/api/request");
    },
    displayRequests: function(id) {
        return axios.get("/api/request/" + id);
    },
    login: function(username) {
        return axios.get("/api/login" + username);
    },
    signUp: function() {
        return axios.post("/api/signup");
    }
};
