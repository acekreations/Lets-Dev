import React, { Component } from "react";
import Stats from "../../components/Stats";
import Rank from "../../components/Rank";

class Home extends Component {
    render() {
        return (
            <div>
                <Stats actions="104" rank="4" globalRank="1286" />
                <div className="uk-section uk-section-default uk-margin-large-top uk-padding-remove">
                    <Rank
                        name="Denise Smith"
                        activity="212"
                        rank="1"
                        profileImage="https://via.placeholder.com/64x64"
                    />
                </div>
            </div>
        );
    }
}

export default Home;
