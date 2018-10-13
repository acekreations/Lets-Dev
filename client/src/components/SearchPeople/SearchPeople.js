import React, { Component } from "react";
import SearchPeopleResults from "../SearchPeopleResults";
import "./SearchPeople.css";
import API from "../../utils/API";

class SearchPeople extends Component {
    state = {
        searchInput: "",
        results: [],
        friends: this.props.friends
    };

    inputChange = event => {
        const thisComp = this;
        const { value } = event.target;
        this.setState({
            searchInput: value
        });
        API.search(this.state.searchInput).then(function(res) {
            console.log("***search response: ", res.data);
            const newResult = res.data.filter(result => thisComp.state.friends.indexOf(result) === -1);
            thisComp.setState({
                results: newResult
            });
        });
    };

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
                            onChange={this.inputChange}
                            name="searchInput"
                            className="uk-input"
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
