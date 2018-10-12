import React, { Component } from "react";
import Stats from "../../components/Stats";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";

class Profile extends Component {
    state = {
        name: "",
        username: "",
        profileImage: "",
        githubURL: ""
    };

    componentDidMount() {
        this.loadProfile();
    }

    loadProfile = () => {
        const thisComp = this;
        API.getUserProfile(this.props.match.params.username).then(res => {
            console.log(res);
            thisComp.setState({
                username: res.username,
                fullName: res.fullName,
                imageUrl: res.imageUrl,
                githubURL: "https://github.com/" + res.username
            });
        });
    };

    render() {
        return (
            <div>
                <NavBar />
                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <img
                        className="profileImageLg uk-margin-large-top"
                        alt="profile"
                        src={this.state.profileImage}
                    />
                    <p className="uk-margin-top uk-margin-small-bottom">
                        {this.state.name}
                    </p>
                    <ul className="uk-iconnav">
                        <li>
                            <a
                                href={this.state.githubURL}
                                className="uk-link-reset"
                                uk-tooltip="Github Profile"
                            >
                                <span uk-icon="icon: github" />
                            </a>
                        </li>
                    </ul>
                    <Stats actions="104" rank="4" globalRank="1286" />
                </div>
            </div>
        );
    }
}

export default Profile;
