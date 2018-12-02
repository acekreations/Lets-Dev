import React, { Component } from "react";
import Stats from "../../components/Stats";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

class Profile extends Component {
    state = {
        user: {},
        profileOwner: {},
        friends: []
    };

    componentDidMount() {
        this.checkLogin();
    }

    checkLogin = () => {
        const thisComp = this;
        if (cookies.get("user")) {
            this.setState({
                user: cookies.get("user")
            });
            this.loadProfile(thisComp);
        } else {
            window.location.replace("/");
        }
    };

    loadProfile = thisComp => {
        console.log("loading profile");
        // const thisComp = this;
        API.getUserProfile(this.props.match.params.username).then(res => {
            console.log(res);
            // API.compileActivity(res.data.id);
            thisComp.setState({
                profileOwner: res.data
            });
            thisComp.getFriends(res.data.id);
        });
    };

    getFriends = userId => {
        console.log("getting friends");
        const thisComp = this;
        API.displayFriends(userId).then(function(friends) {
            friends = friends.data;
            if (Array.isArray(friends)) {
                friends.sort(function(a, b) {
                    return b.activity - a.activity;
                });
                console.log(friends);
                thisComp.setState({
                    friends: friends
                });
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
                <div className="uk-container uk-container-xsmall uk-flex uk-flex-column uk-flex-middle">
                    <img
                        className="profileImageLg uk-margin-large-top"
                        alt="profile"
                        src={this.state.profileOwner.imageUrl}
                    />
                    <p className="uk-margin-top uk-margin-small-bottom">
                        {this.state.profileOwner.fullName}
                    </p>
                    <ul className="uk-iconnav">
                        <li>
                            <a
                                href={
                                    "https://github.com/" +
                                    this.state.profileOwner.username
                                }
                                className="uk-link-reset"
                                uk-tooltip="Github Profile"
                            >
                                <span uk-icon="icon: github" />
                            </a>
                        </li>
                    </ul>
                    <Stats
                        friends={this.state.friends}
                        user={this.state.profileOwner}
                        username={this.props.match.params.username}
                    />
                </div>
            </div>
        );
    }
}

export default Profile;
