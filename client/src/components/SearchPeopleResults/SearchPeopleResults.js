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
                        src={this.props.imageUrl}
                    />
                </td>
                <td className="uk-text-left table-80">
                    <Link to={"/profile/" + this.props.username} className="uk-link-reset">
                        {this.props.fullName}
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
