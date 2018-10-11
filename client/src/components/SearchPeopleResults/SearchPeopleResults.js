import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchPeopleResults.css";

class SearchPeopleResults extends Component {
    render() {
        return (
            <tr>
                <td className="uk-text-left table-10">
                    <img
                        className="profileImage"
                        alt="profile"
                        src={this.props.profileImage}
                    />
                </td>
                <td className="uk-text-left table-80">
                    <Link to={"/"} className="uk-link-reset">
                        {this.props.name}
                    </Link>
                </td>
                <td className="uk-text-center table-10">
                    <span uk-icon="plus" />
                </td>
            </tr>
        );
    }
}

export default SearchPeopleResults;
