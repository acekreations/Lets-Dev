import axios from "axios";

export default {
    //example
    getFriends: function() {
        return axios.get("/api/friends");
    }
};
