import React, { Component } from "react";
import SearchPeople from "../../components/SearchPeople";
import SearchFriends from "../../components/SearchFriends";
import PendingFriends from "../../components/PendingFriends";
import API from "../../utils/API";
import NavBar from "../../components/NavBar";
import Cookie from "react-cookie";

class Friends extends Component {
    state = {
        friends: [],
        requests: []
    };

    componentDidMount() {
        //loadFriends();
        //loadRequests();
    }

    loadFriends = () => {
        const thisComp = this;
        const userId = Cookie.get("userId");
        API.getFriends(userId).then(function(res) {
            thisComp.setState({
                friends: res.data
            });
        });
    };

    loadRequests = () => {
        const thisComp = this;
        API.displayRequests().then(function(res) {
            thisComp.setState({
                requests: res.data
            });
        });
    };

    render() {
        return (
            <div>
                <NavBar />
                <div className="uk-container uk-container-xsmall">
                    {this.state.pendingFriends.length > 0 && (
                        <PendingFriends requests={this.state.requests} />
                    )}
                    <SearchPeople />
                    {this.state.friends.length > 0 && (
                        <SearchFriends friends={this.state.friends} />
                    )}
                </div>
            </div>
        );
    }
}

export default Friends;
