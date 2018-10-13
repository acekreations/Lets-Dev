import React, { Component } from "react";
import "./Landing.css";
import { Animated } from "react-animated-css";
import API from "../../utils/API";

class Landing extends Component {
    state = {
        j: 0
    };

    componentDidMount() {
        this.typeTagLine();
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

    login = () => {
        API.login().then(function() {
            //do stuff
        });
    };

    signup = (userData) => {
        API.signup.then(function(userData) {
            //do stuff
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
                        <button
                            className="uk-margin-top landingBtn"
                            onClick={this.login}
                        >
                            Sign In
                        </button>
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
