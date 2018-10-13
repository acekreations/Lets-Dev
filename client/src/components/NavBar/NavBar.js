import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {

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
                                to={"/profile/" + this.props.username}
                                className="uk-link-reset"
                            >
                                {this.props.fullName}
                            </Link>
                        </li>
                        <li>
                            <img
                                className="profile-image"
                                src={this.props.profileImage}
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
