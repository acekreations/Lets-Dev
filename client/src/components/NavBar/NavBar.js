import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import API from "../../utils/API";

class NavBar extends Component {
    state = {
        name: "",
        username: "",
        profileImage: ""
    };

    componentDidMount() {
        this.loadProfile();
    }

    loadProfile = () => {
        const thisComp = this;
        // API.getUserProfile(this.props.match.params.username).then(res => {
        API.getUserProfile("aehaq").then(res => {
            console.log(res);
            thisComp.setState({
                username: res.username,
                fullName: res.fullName,
                imageUrl: res.imageUrl
            });
        });
    };

    render() {
        return (
            <nav className="uk-navbar-container" uk-navbar="true">
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li>
                            <a href="#">
                                <span uk-icon="icon: menu; ratio: 1.3" />
                            </a>
                            <div
                                className="uk-navbar-dropdown"
                                uk-dropdown="mode: click; offset: -15; flip: true;"
                            >
                                <ul className="uk-nav uk-dropdown-nav">
                                    <li>
                                        <Link to={"/"}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to={"/friends"}>Friends</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="uk-navbar-center">
                    <a className="uk-link-reset" href="/">
                        <h3>Lets_Dev</h3>
                    </a>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav uk-flex-middle">
                        <li>
                            <Link
                                to={"/profile/" + this.state.username}
                                className="uk-link-reset"
                            >
                                {this.state.fullName}
                            </Link>
                        </li>
                        <li>
                            <img
                                className="profile-image"
                                src={this.state.profileImage}
                                alt="profile"
                            />
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;
