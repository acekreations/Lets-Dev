import React, { Component } from "react";
import "./Landing.css";
import { Animated } from "react-animated-css";
import { Cookies } from "react-cookie";
import { queryString } from "query-string";
import API from "../../utils/API";

const cookies = new Cookies();

class Landing extends Component {
    state = {
        j: 0,
        isAuthenticated: false
    };

    componentDidMount() {
        this.typeTagLine();
        if (!cookies.get("user")) {
            this.handleAuth();
        }
    }

    typeTagLine = () => {
        var speed = Math.random() * (100 - 50) + 50;
        const txt = "Social Accountability For Developers";
        if (this.state.j < txt.length) {
            document.getElementById("tag-line").innerHTML += txt.charAt(
                this.state.j
            );
            this.setState({
                j: this.state.j + 1
            });
            setTimeout(this.typeTagLine, speed);
        }
    };

    //Grab data from url params that returns from auth flow and set cookies
    handleAuth = () => {
        console.log(this.props);
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        var access_token = params.get("access_token");
        var username = params.get("login");
        var fullName = params.get("name");
        var email = params.get("email");
        var imageUrl = params.get("avatar_url");

        let userData = {
            username: username,
            fullName: fullName,
            email: email,
            imageUrl: imageUrl,
            access_token: access_token
        };

        this.signUp(userData);

        // set state to authenticated if user access_token is stored
        if (access_token) {
            this.setState({
                isAuthenticated: true
            });
        } else {
            this.setState({
                isAuthenticated: false
            });
        }
    };

    signUp = userData => {
        const thisComp = this;
        console.log("\n SIGN UP FUNCTION STARTS \n");
        console.log(userData);
        API.signUp(userData)
            .then(function(res) {
                API.updateActivity(res.data.id);
                cookies.set("user", res.data, {
                    path: "/"
                });
                window.location.replace("/home");
            })
            .catch(err => {
                thisComp.login(userData.username);
            });
    };

    login = username => {
        API.login(username)
            .then(function(res) {
                //if success, store info in cookie
                API.updateActivity(res.data.id);
                cookies.set("user", res.data, {
                    path: "/"
                });
                window.location.replace("/home");
            })
            .catch(err => {
                console.log(err);
            });
    };

    checkAllForUpdates = () => {
        API.search("").then(function(res) {
            res.forEach(user => {
                API.updateActivity(user.id);
            });
        });
    };

    render() {
        return (
            <div className="uk-container-expand landing-container-main">
                <div className="uk-container uk-container-small">
                    <div className="uk-text-right uk-flex uk-flex-right uk-flex-middle landing-menu">
                        <a
                            href="#features"
                            className="uk-margin-top uk-margin-right"
                        >
                            Features
                        </a>
                        <a
                            className="uk-margin-top landingBtn"
                            href="https://github.com/login/oauth/authorize?client_id=9988a9f4ea38fbb0c35e"
                        >
                            Sign In
                        </a>
                    </div>
                    <div
                        id="callToAction"
                        className="uk-flex uk-flex-between uk-flex-middle"
                    >
                        <div className="uk-flex uk-flex-column uk-flex-left">
                            <Animated>
                                <h1 id="logo-text animated fadeIn">Lets_Dev</h1>
                            </Animated>
                            <Animated animationIn="zoomIn">
                                <p id="tag-line" />
                            </Animated>
                        </div>
                        <div className="uk-flex uk-flex-middle uk-flex-right">
                            <Animated animationIn="flipInX">
                                <button
                                    className="landingBtn"
                                    onClick={this.signup}
                                >
                                    Sign Up With GitHub{" "}
                                    <span uk-icon="icon: github" />
                                </button>
                            </Animated>
                        </div>
                    </div>
                </div>
                <div className="uk-container-expand landing-container-grey">
                    <div className="uk-container uk-container-small">
                        <p>
                            Lets_Dev is platform that encourages developers to
                            spend more time coding. Using your GitHub account as
                            a measure we compare you and your friends to create
                            a friendly competition to see who codes the most.
                        </p>
                    </div>
                </div>
                <div className="uk-container-expand landing-container">
                    <div
                        id="features"
                        className="uk-container uk-container-small"
                    >
                        <h2>Features</h2>
                        <ul>
                            <li>
                                Rolling weekly learderboard between you and your
                                friends
                            </li>
                            <li>
                                Your percentile rank across the platform to show
                                how you compare to users across the whole
                                platform rather than just your friends
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
