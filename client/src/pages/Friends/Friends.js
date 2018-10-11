import React, { Component } from "react";
import SearchPeople from "../../components/SearchPeople";
import SearchFriends from "../../components/SearchFriends";

class Friends extends Component {
    state = {
        friends: []
    };
    
    
    componentDidMount(){
        //loadFriends();
    };
    
    loadFriends = () => {
        //api call to load all friends
    };

    render() {
        return (
            <div>
                <SearchPeople />
                <SearchFriends friends={this.state.friends} />
            </div>
        )
    }
}

export default Friends;