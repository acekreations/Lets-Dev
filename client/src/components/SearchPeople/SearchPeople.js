import React, { Component } from "react";
import SearchPeopleResults from "../SearchPeopleResults";
import "./SearchPeople.css";

class SearchPeople extends Component {
    state = {
        searchInput: ""
    };

    inputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
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
                                <SearchPeopleResults
                                    name="Craig Melville"
                                    profileImage="https://via.placeholder.com/64x64"
                                />
                                <SearchPeopleResults
                                    name="Craig Melville"
                                    profileImage="https://via.placeholder.com/64x64"
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPeople;
