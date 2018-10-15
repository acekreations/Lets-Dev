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
        if (cookies.get("user")) {
            this.setState({
                user: cookies.get("user")
            });
            this.loadProfile();
        } else {
            window.location.replace("/");
        }
    };

    loadProfile = () => {
        console.log("loading profile");
        const thisComp = this;
        API.getUserProfile(this.props.match.params.username).then(res => {
            console.log(res);
            thisComp.setState({
                profileOwner: res.data
            });
        });
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

    render() {
        return (
            <div>
                <NavBar
                    fullName={this.state.user.fullName}
                    username={this.state.user.username}
                    profileImage={this.state.user.imageUrl}
                />
                <div className="uk-flex uk-flex-column uk-flex-middle">
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
                        user={this.state.user}
                    />
                </div>
            </div>
        );
    }
}

export default Profile;
