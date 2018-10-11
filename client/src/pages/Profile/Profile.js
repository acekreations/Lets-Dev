import React, { Component } from "react";
import Stats from "../../components/Stats";
import NavBar from "../../components/NavBar";

class Profile extends Component {
    state = {
        name: "Craig Melvillle",
        username: "acekreations",
        profileImage: "https://via.placeholder.com/350x350",
        githubURL: "https://github.com/acekreations"
    };

    componentDidMount() {
        this.loadProfile();
    }

    loadProfile = () => {
        console.log(this.props.match.params.username);

        //API call => set state
    };

    render() {
        return (
            <div>
                <NavBar name="Craig Melville" username="acekreations" />
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
