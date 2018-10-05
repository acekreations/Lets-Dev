import React, { Component } from "react";
import "./NavBar.css";

class NavBar extends Component {
    
    render() {
        return (
            <nav className="uk-navbar-container" uk-navbar="true">
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li>
                            <a href="#"><span uk-icon="icon: menu; ratio: 1.3"></span></a>
                            <div className="uk-navbar-dropdown" uk-drop="mode: click; offset: -15;">
                                <ul className="uk-nav uk-navbar-dropdown-nav">
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Friends</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="uk-navbar-center">
                    <a className="uk-link-reset" href="/"><h3>Lets_Dev</h3></a>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav uk-flex-middle">
                        <li>Craig Melville</li>
                        <li><div className="profile-image"></div></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;