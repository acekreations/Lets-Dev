import React, { Component } from "react";
import Stats from "../../components/Stats";
import Rank from "../../components/Rank";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

class Home extends Component {
    state = {
        user: {},
        friends: [],
        rank: "",
        globalRank: "",
        activity: ""
    };

    componentDidMount() {
        this.checkLogin();
        this.loadActivity(cookies.get("user").username);
    }

    loadActivity = username => {
        const thisComp = this;
        API.getUserProfile(username).then(res => {
            console.log(res);
            thisComp.setState({
                activity: res.data.activity
            });
        });
    };

    checkLogin = () => {
        if (cookies.get("user")) {
            const user = cookies.get("user");
            this.setState({
                user: user
            });
            console.log("cookies: ", cookies.get("user"));
            this.getFriends(user);
            API.updateActivity(user.id);
        } else {
            window.location.replace("/");
        }
    };

    getFriends = user => {
        console.log(user);
        const thisComp = this;
        API.displayFriends(user.id).then(function(friends) {
            if (Array.isArray(friends)) {
                friends.sort(function(a, b) {
                    return a.activity - b.activity;
                });
                thisComp.setState({
                    friends: friends
                });
            }
        });
    };

    calculatePercentileFriends = () => {
        const array = this.state.friends;
        array.push(this.state.user);
        array.sort(function(a, b) {
            return a.activity - b.activity;
        });
        const userRank = array.findIndex(
            item => item.username === this.state.user.username
        );
        const total = array.length;
        const percentile = (total - userRank) / userRank;
        this.setState({
            rank: percentile
        });
    };

    calculatePercentileGlobal = () => {
        const thisComp = this;
        API.search("").then(function(array) {
            array.sort(function(a, b) {
                return a.activity - b.activity;
            });
            const userRank = array.findIndex(
                item => item.username === thisComp.state.user.username
            );
            const total = array.length;
            const percentile = (total - userRank) / userRank;
            thisComp.setState({
                globalRank: percentile
            });
        });
    };

    render() {
        return (
            <div>
                <NavBar
                    fullName={this.state.user.fullName}
                    username={this.state.user.username}
                    profileImage={this.state.user.imageUrl}
                />
                <div className="uk-container uk-container-xsmall">
                    <Stats
                        actions={this.state.user.activity}
                        rank={this.state.rank * 100 + "%"}
                        globalRank={this.state.globalRank * 100 + "%"}
                    />
                    <div className="uk-section uk-section-default uk-margin-large-top uk-padding-remove">
                        <Rank friends={this.state.friends} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
