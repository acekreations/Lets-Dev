import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

class NavBar extends Component {
    handleLogout = () => {
        cookies.remove("user", { path: "/" });
        window.location.replace("/");
    };

    render() {
        return (
            <nav className="uk-navbar-container" uk-navbar="true">
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li>
                            <button className="noStyleBtn">
                                <span uk-icon="icon: menu; ratio: 1.3" />
                            </button>
                            <div
                                className="uk-navbar-dropdown"
                                uk-dropdown="mode: click; offset: -15; flip: true;"
                            >
                                <ul className="uk-nav uk-dropdown-nav">
                                    <li>
                                        <Link to={"/home"}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to={"/friends"}>Friends</Link>
                                    </li>
                                    <li className="uk-nav-divider" />
                                    <li>
                                        <Link
                                            to={"#"}
                                            onClick={this.handleLogout}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="uk-navbar-center">
                    <a className="uk-link-reset" href="/home">
                        <h3>Lets_Dev</h3>
                    </a>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav uk-flex-middle">
                        <li>
                            <a
                                href={"/profile/" + this.props.username}
                                className="uk-link-reset"
                            >
                                {this.props.fullName}
                            </a>
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
