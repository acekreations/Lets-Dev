import React, { Component } from "react";
import API from "../../utils/API";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

class Stats extends Component {
    state = {
        rank: 0,
        globalRank: 0,
        activity: 0,
        friends: []
    };

    componentDidMount() {
        this.loadActivity(this.props.username);
        this.calculatePercentileGlobal();
        // this.calculatePercentileFriends(this.props.friends);
    }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.user !== this.props.user){
    //         console.log(this.props.user)
    //         this.getFriends(this.props.user.id);
    //     }
    // }

    // getFriends = (userId) => {
    //     const thisComp = this;
    //     // API.getUserProfile(this.props.username).then(user => {

    //     // })
    //     API.displayFriends(1).then(function (friends) {
    //         if (Array.isArray(friends.data)) {
    //             console.log(friends.data)
    //             friends.data.sort(function (a, b) {
    //                 return b.activity - a.activity;
    //             });
    //             thisComp.setState({
    //                 friends: friends.data
    //             });
    //             this.calculatePercentileFriends(friends.data);
    //         } else {
    //             console.log("friends is not an array");
    //         }
    //     });
    // };

    loadActivity = username => {
        const thisComp = this;
        API.getUserProfile(username).then(res => {
            thisComp.setState({
                activity: res.data.activity
            });
        });
    };

    // calculatePercentileFriends = (arr) => {
    //     // console.log("props ", this.props.friends);
    //     //const arr = this.props.friends;
    //     console.log("friends: ", arr);
    //     console.log(this.props.user);
    //     arr.push(this.props.user);
    //     console.log("post push: ", arr)
    //     arr.sort(function(a, b) {
    //         return b.activity - a.activity;
    //     });
    //     console.log("post sort: ", arr)
    //     let userRank = arr.findIndex(
    //         item => item.username === this.props.username
    //     );
    //     userRank += 1;
    //     console.log("user rank: " +userRank )
    //     this.setState({
    //         rank: userRank
    //     });
    // };

    calculatePercentileGlobal = () => {
        const thisComp = this;
        API.getAllUsers().then(function(arr) {
            // console.log(arr.data)
            arr = arr.data;
            if (Array.isArray(arr)) {
                // console.log("is array")
                arr.sort(function(a, b) {
                    return b.activity - a.activity;
                });
                // console.log(arr)
                let userRank = arr.findIndex(
                    item => item.username === thisComp.props.username
                );
                userRank += 1;
                const total = arr.length;
                // console.log(total)
                // console.log("user rank: " +userRank )
                const percentile = (total - userRank) / userRank;
                thisComp.setState({
                    rank: userRank,
                    globalRank: percentile
                });
            }
        });
    };

    render() {
        return (
            <div className="uk-section uk-section-default uk-width-expand uk-margin-large-top uk-padding-remove-top">
                <p className="uk-margin-small-top uk-margin-small-left uk-margin-medium-bottom">
                    Your Stats
                </p>
                <div className="uk-text-center uk-flex uk-flex-around uk-flex-middle">
                    <div>
                        <h1 className="uk-margin-bottom">
                            {this.state.activity}
                        </h1>
                        <p className="uk-text-meta">Activity</p>
                    </div>
                    <div>
                        <h1 className="uk-margin-bottom">{this.state.rank}</h1>
                        <p className="uk-text-meta">Global Rank</p>
                    </div>
                    <div>
                        <h1 className="uk-margin-bottom">
                            {this.state.globalRank * 100 + "%"}
                        </h1>
                        <p className="uk-text-meta">Global Percentile</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stats;
