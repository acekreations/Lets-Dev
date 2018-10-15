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
        rank: "",
        globalRank: ""
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

    calculatePercentileFriends = () => {
        const thisComp = this;
        API.displayFriends(this.state.profileOwner.id).then(function(array) {
            array.push(thisComp.state.profileOwner);
            array.sort(function(a, b) {
                return a.activity - b.activity;
            });
            const userRank = array.findIndex(
                item => item.username === thisComp.state.profileOwner.username
            );
            const total = array.length;
            const percentile = (total - userRank) / userRank;
            thisComp.setState({
                rank: percentile
            });
        });
    };

    calculatePercentileGlobal = () => {
        const thisComp = this;
        API.search("").then(function(array) {
            array.sort(function(a, b) {
                return a.activity - b.activity;
            });
            const userRank = array.findIndex(
                item => item.username === thisComp.state.profileOwner.username
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
                        actions={this.state.profileOwner.activity}
                        rank={this.state.rank * 100 + "%"}
                        globalRank={this.state.globalRank * 100 + "%"}
                    />
                </div>
            </div>
        );
    }
}

export default Profile;
