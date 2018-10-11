import React, { Component } from "react";
import SearchPeople from "../../components/SearchPeople";
import SearchFriends from "../../components/SearchFriends";
import PendingFriends from "../../components/PendingFriends";
import API from "../../utils/API";
import NavBar from "../../components/NavBar";

class Friends extends Component {
    state = {
        friends: [],
        pendingFriends: []
    };

    componentDidMount() {
        //loadFriends();
        //loadPendingFriends();
    }

    loadFriends = () => {
        const thisComp = this;
        API.getFriends().then(function(res) {
            thisComp.setState({
                friends: res.data
            });
        });
    };

    loadPendingFriends = () => {
        const thisComp = this;
        API.getPendingFriends().then(function(res) {
            thisComp.setState({
                friends: res.data
            });
        });
    };

    render() {
        return (
            <div>
                <NavBar name="Craig Melville" username="acekreations" />
                <div className="uk-container uk-container-xsmall">
                    {this.state.pendingFriends.length > 0 && (
                        <PendingFriends
                            pendingFriends={this.state.pendingFriends}
                        />
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
