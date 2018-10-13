import React, { Component } from "react";
import SearchPeople from "../../components/SearchPeople";
import SearchFriends from "../../components/SearchFriends";
import PendingFriends from "../../components/PendingFriends";
import API from "../../utils/API";
import NavBar from "../../components/NavBar";
// import Cookie from "react-cookie";

class Friends extends Component {
    state = {
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
            console.log(friends)
            // let friendsArray = [];
            // friends.forEach(friend => {
            //     if (friend.Friendships.accepted) {
            //         let friendObject = {
            //             userName: friend.username,
            //             fullName: friend.fullname,
            //             imgUrl: friend.imageUrl,
            //             activity: friend.activity,
            //             id: friend.id
            //         };
            //         friendsArray.push(friendObject)
            //     }
            // }).then( () =>
            //     thisComp.setState({
            //         friends: friendsArray
            //     })
            // )
        });
    };

    loadRequests = () => {
        const thisComp = this;
        const userId = 1;
        // API.displayFriends(userId).then(function(res) {
        //     let requestsArray = [];
        //     friends.forEach(friend => {
        //         if (friend.Friendships.accepted) {
        //             let friendObject = {
        //                 userName: friend.username,
        //                 fullName: friend.fullname,
        //                 imgUrl: friend.imageUrl,
        //                 activity: friend.activity,
        //                 id: friend.id
        //             };
        //             requestsArray.push(friendObject)
        //         }
        //     }).then( () =>
        //         thisComp.setState({
        //             requests: requestsArray
        //         })
        //     )
        // });
        API.displayRequests(userId).then(function(res) {
            console.log(res)
            thisComp.setState({
                requests: res
            })
        })
    };

    render() {
        return (
            <div>
                <NavBar />
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
