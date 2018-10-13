import React, { Component } from "react";
import Stats from "../../components/Stats";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";

class Profile extends Component {
    state = {
        user: {},
        profileOwner: {}
    };

    componentDidMount() {
        // grab userinfo from cookie to store as user
        this.loadProfile();
    }

    loadProfile = () => {
        console.log("loading profile")
        const thisComp = this;
        API.getUserProfile(this.props.match.params.username).then(res => {
            console.log(res);
            thisComp.setState({
                profileOwner: res.data
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
                                href={"https://github.com/" + this.state.profileOwner.username}
                                className="uk-link-reset"
                                uk-tooltip="Github Profile"
                            >
                                <span uk-icon="icon: github" />
                            </a>
                        </li>
                    </ul>
                    <Stats actions={this.state.profileOwner.activity} rank="4" globalRank="1286" />
                </div>
            </div>
        );
    }
}

export default Profile;
