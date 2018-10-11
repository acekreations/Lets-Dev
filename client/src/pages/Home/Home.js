import React, { Component } from "react";
import Stats from "../../components/Stats";
import Rank from "../../components/Rank";
import NavBar from "../../components/NavBar";

class Home extends Component {
    //get stats from api

    //get friends rank from api

    render() {
        return (
            <div>
                <NavBar name="Craig Melville" username="acekreations" />
                <div className="uk-container uk-container-xsmall">
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
            </div>
        );
    }
}

export default Home;
