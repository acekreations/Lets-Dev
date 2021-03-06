import axios from "axios";

export default {
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
};
