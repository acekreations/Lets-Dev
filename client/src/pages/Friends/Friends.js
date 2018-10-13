import React, { Component } from "react";
import SearchPeople from "../../components/SearchPeople";
import SearchFriends from "../../components/SearchFriends";
import PendingFriends from "../../components/PendingFriends";
import API from "../../utils/API";
import NavBar from "../../components/NavBar";
// import Cookie from "react-cookie";

class Friends extends Component {
    state = {
        user: {},
        friends: [],
        requests: []
    };

    componentDidMount() {
        this.loadFriends();
        this.loadRequests();
    }

    loadFriends = () => {
        const thisComp = this;
        // const userId = Cookie.get("userId");
        const userId = 1;
        API.displayFriends(userId).then(function(friends) {
            thisComp.setState({
                friends: friends.data
            })
        });
    };

    loadRequests = () => {
        const thisComp = this;
        const userId = 1;
        API.displayRequests(userId).then(function(requests) {
            console.log(requests.data[0])
            thisComp.setState({
                requests: requests.data
            })
        })
    };

    render() {
        return (
            <div>
                <NavBar 
                    fullName={this.state.user.fullName} 
                    username={this.state.user.username} 
                    profileImage={this.state.user.imageUrl}
                />
                <div className="uk-container uk-container-xsmall">
                    {this.state.requests.length > 0 && (
                        <PendingFriends requests={this.state.requests} />
                    )}

                    <SearchPeople friends={this.state.friends} />

                    {this.state.friends.length > 0 && (
                        <SearchFriends friends={this.state.friends} />
                    )}
                </div>
            </div>
        );
    }
}

export default Friends;
