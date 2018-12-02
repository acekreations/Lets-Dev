import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchPeopleResults.css";
import API from "../../utils/API";
import { Cookies } from "react-cookie";
import UIkit from "uikit";

const cookies = new Cookies();

class SearchPeopleResults extends Component {
    createRequest = arg => {
        // grab from cookie
        const user = cookies.get("user");
        const userId = user.id;
        const friendId = arg;
        console.log(arg);
        const data = {
            userId: userId,
            friendId: friendId
        };
        API.createRequest(data).then(function(result) {
            UIkit.notification({
                message: "Friend request sent!",
                pos: "top-center",
                timeout: 3000
            });
        });
    };

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
                    <Link
                        to={"/profile/" + this.props.username}
                        className="uk-link-reset"
                    >
                        {this.props.fullName}
                    </Link>
                </td>
                <td className="uk-text-center table-10">
                    <div onClick={() => this.createRequest(this.props.id)}>
                        <span className="request-btn" uk-icon="plus" />
                    </div>
                </td>
            </tr>
        );
    }
}

export default SearchPeopleResults;
