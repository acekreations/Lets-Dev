import React, { Component } from "react";
import API from "../../utils/API";

class Stats extends Component {
    state = {
        rank: 0,
        globalRank: 0,
        activity: 0,
        friends: this.props.friends,
        user: this.props.user
    };

    componentDidMount() {
        this.calculatePercentileFriends();
        this.calculatePercentileGlobal();
    }

    getActions = () => {
        API.getUserProfile(this.state.username).then(function(res) {
            this.setState({
                actions: res.data.activity
            });
        });
    };

    calculatePercentileFriends = () => {
        const arr = this.state.friends;
        arr.push(this.state.user);
        arr.sort(function(a, b) {
            return a.activity - b.activity;
        });
        let userRank = arr.findIndex(
            item => item.username === this.state.user.username
        );
        // const total = arr.length;
        // const percentile = (total - userRank) / userRank;
        userRank += 1;
        this.setState({
            rank: userRank
        });
    };

    calculatePercentileGlobal = () => {
        const thisComp = this;
        API.search("").then(function(arr) {
            arr.sort(function(a, b) {
                return a.activity - b.activity;
            });
            const userRank = arr.findIndex(
                item => item.username === thisComp.state.user.username
            );
            const total = arr.length;
            const percentile = (total - userRank) / userRank;
            thisComp.setState({
                globalRank: percentile
            });
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
                        <h1 className="uk-margin-bottom">
                            {this.state.rank * 100 + "%"}
                        </h1>
                        <p className="uk-text-meta">Friends Rank</p>
                    </div>
                    <div>
                        <h1 className="uk-margin-bottom">
                            {this.state.globalRank * 100 + "%"}
                        </h1>
                        <p className="uk-text-meta">Global Rank</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stats;
