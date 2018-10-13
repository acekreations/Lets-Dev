import React, { Component } from "react";
import SearchPeopleResults from "../SearchPeopleResults";
import "./SearchPeople.css";
import API from "../../utils/API";

class SearchPeople extends Component {
    state = {
        searchInput: "test",
        results: []
        // friends: this.props.friends
    };

    handleInputChange = event => {
        console.log("input Change ran");
        console.log(event.target);
        // const thisComp = this;
        const value = event.target.value;
        this.setState({
            searchInput: value
        });
        console.log(value);
        this.searchPeople();
    };

    searchPeople = () => {
        console.log("hello")
        console.log(this.state.searchInput)
        API.search(this.state.searchInput).then(function (res) {
            console.log("***search response: ", res.data);
            const newResult = res.data.filter(result => thisComp.state.friends.indexOf(result) === -1);
            thisComp.setState({
                results: newResult
            });
        });
    }

    logStuff = () => {
        console.log("logging stuff");
    }

    render() {
        return (
            <div>
                <div className="uk-section uk-section-default uk-width-expand uk-margin-large-top uk-padding-small">
                    <p className="uk-margin-small-bottom">Add Friends</p>
                    <form className="uk-search uk-search-default uk-margin-auto-left uk-margin-auto-right uk-width-expand">
                        <span
                            className="uk-form-icon uk-form-icon-flip"
                            uk-icon="icon: search"
                        />
                        <input
                            value={this.state.searchInput}
                            name="searchInput"
                            className="uk-input"
                            onchange={this.logStuff} 
                            type="search"
                            placeholder="Search..."
                        />
                    </form>

                    <div className="uk-text-center uk-flex uk-flex-around uk-flex-middle">
                        <table className="uk-table uk-table-divider uk-table-middle uk-margin-top">
                            <tbody>
                                {this.state.results.map(result => <SearchPeopleResults key={result.id} fullName={result.fullName} imageUrl={result.imageUrl} username={result.username}/>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPeople;
