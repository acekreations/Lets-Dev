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
        friends: []
    };

    componentDidMount() {
        this.checkLogin();
        API.compileActivity(cookies.get("user").id)
            .then(res => {
                console.log(res);
                this.loadActivity(cookies.get("user").username);
            })
            .catch(err => console.log(err));
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
            this.getFriends(cookies.get("user"));
            //API.updateActivity(user.id);
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
            } else {
                console.log("friends is not an array");
            }
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
                        friends={this.state.friends}
                        user={this.state.user}
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
