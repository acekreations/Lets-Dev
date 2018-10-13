import axios from "axios";

export default {
    getUserProfile: function(username) {
        return axios.get("/api/users/" + username);
    },
    displayFriends: function(id) {
        return axios.get("/api/friends/" + id);
    },
    updateActivity: function(id) {
        return axios.post("/api/update/" + id);
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
        return axios.get("api/users/search/" + query);
    }
};
