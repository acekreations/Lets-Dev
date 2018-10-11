import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchFriends extends Component {
    searchTable() {
        // Declare variables
        var input, filter, table, tr, td, i;
        input = document.getElementById("friendSearchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("friendTable");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];

            if (td) {
                if (td.innerText.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    render() {
        return (
            <div className="uk-section uk-section-default uk-width-expand uk-margin-large-top uk-padding-small">
                <div className="uk-flex uk-flex-between">
                    <p>Your Friends</p>
                    <form className="uk-search uk-search-default">
                        <span
                            className="uk-form-icon uk-form-icon-flip"
                            uk-icon="icon: search"
                        />
                        <input
                            name="friendSearchInput"
                            id="friendSearchInput"
                            className="uk-input"
                            type="search"
                            placeholder="Search..."
                            onChange={this.searchTable}
                        />
                    </form>
                </div>
                <table
                    className="uk-table uk-table-divider uk-table-middle uk-margin-top"
                    id="friendTable"
                >
                    <tbody>
                        <tr>
                            <td className="uk-text-left table-10">
                                <img
                                    className="profileImage"
                                    alt="profile"
                                    src="https://via.placeholder.com/64x64"
                                />
                            </td>
                            <td className="uk-text-left table-80">
                                <Link to={"/"} className="uk-link-reset">
                                    Craig Melville
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="uk-text-left table-10">
                                <img
                                    className="profileImage"
                                    alt="profile"
                                    src="https://via.placeholder.com/64x64"
                                />
                            </td>
                            <td className="uk-text-left table-80">
                                <Link to={"/"} className="uk-link-reset">
                                    John Smith
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SearchFriends;
