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
        rank: []
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

    createRank = (cb) => {
        this.setState({
            rank: this.state.rank.concat(this.state.user)
        });
        cb(cookies.get("user"));
    }

    loadActivity = username => {
        const thisComp = this;
        API.getUserProfile(username).then(res => {
            thisComp.setState({
                user: res.data,
                activity: res.data.activity
            });
            this.createRank(this.getFriends);
        });
    };

    checkLogin = () => {
        if (cookies.get("user")) {
            const user = cookies.get("user");
            // this.setState({
            //     user: user
            // });
            // this.getFriends(cookies.get("user"));
            //API.updateActivity(user.id);
        } else {
            window.location.replace("/");
        }
    };

    getFriends = user => {
        const thisComp = this;
        API.displayFriends(cookies.get("user").id).then(function(friends) {
            if (Array.isArray(friends.data)) {
                let newArray = thisComp.state.rank.concat(friends.data)
                let rank = newArray.sort(function(a, b) {
                    return b.activity - a.activity;
                });
                thisComp.setState({
                    friends: friends.data,
                    rank: rank
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
                        username={cookies.get("user").username}
                    />
                    <div className="uk-section uk-section-default uk-margin-large-top uk-padding-remove">
                        <Rank friends={this.state.rank} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
