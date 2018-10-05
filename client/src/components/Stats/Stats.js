import React, { Component } from "react";


class Stats extends Component {
    render() {
        return (
            <div className="uk-section uk-section-default uk-width-expand uk-margin-large-top uk-padding-remove-top">
                <p className="uk-margin-small-top uk-margin-small-left uk-margin-medium-bottom">Your Stats</p>
                <div className="uk-text-center uk-flex uk-flex-around uk-flex-middle">
                    <div>
                        <h1 className="uk-margin-bottom">{this.props.actions}</h1>
                        <p className="uk-text-meta">Actions</p>
                    </div>
                    <div>
                        <h1 className="uk-margin-bottom">{this.props.rank}</h1>
                        <p className="uk-text-meta">Cohort Rank</p>
                    </div>
                    <div>
                        <h1 className="uk-margin-bottom">{this.props.globalRank}</h1>
                        <p className="uk-text-meta">Global Rank</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Stats;