import React, { Component } from "react";
import Stats from "../../components/Stats";
import Rank from "../../components/Rank";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";

class Home extends Component {

    componentDidMount() {

        // if redirect route had login in address
        // this.login(githubData.username)
        this.login('aehaq')
        // else if redirect route had signup in address
        console.log("\n COMPONENT DID MOUNT \n")
        // let signupObject = {
        //     username: "lalatw",
        //     fullName: "Laura Lee",
        //     email: "lauralee.sh@gmail.com",
        //     imageUrl: "https://avatars2.githubusercontent.com/u/37917724?v=4"
        // }
        // this.signUp(signupObject)
    }

    state = {
        user: {},
        friends: {}
    };

    login = (username) => {
        const thisComp = this;
        API.login(username).then(function(res) {
            //if err, redirect to landing page
            //if success, store info in cookie
            thisComp.setState({
                user: res.data
            })
            API.displayFriends(res.data.id).then(function(friends) {
                thisComp.setState({
                    friends: friends
                })
                console.log(friends)
            })
            API.updateActivity(res.data.id)
            
        });
    };

    signUp = (userData) => {
        console.log("\n SIGN UP FUNCTION STARTS \n")
        console.log(userData)
        API.signUp(userData).then(function(response) {
            //if err, redirect to landing page
            //if not err, redirect to login page
            console.log(response)
        });
    };
    //get stats from api

    //get friends rank from api

    render() {
        return (
            <div>
                <NavBar />
                <div className="uk-container uk-container-xsmall">
                    <Stats actions={this.state.user.activity} rank="4" globalRank="1286" />
                    <div className="uk-section uk-section-default uk-margin-large-top uk-padding-remove">
                        <Rank
                            name="Denise Smith"
                            activity="212"
                            rank="1"
                            profileImage="https://via.placeholder.com/64x64"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
