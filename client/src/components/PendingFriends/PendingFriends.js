import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Cookies } from "react-cookie";
import UIkit from "uikit";

const cookies = new Cookies();

class PendingFriends extends Component {
    acceptRequest = arg => {
        const thisComp = this;
        // grab from cookie
        const user = cookies.get("user");
        const userId = user.id;
        const friendId = arg;
        console.log(arg);
        const data = {
            userId: userId,
            friendId: friendId
        };
        console.log(data);
        API.acceptRequest(data).then(function(result) {
            thisComp.props.loadFriends();
            thisComp.props.loadRequests();
            UIkit.notification({
                message: "Friend request accepted!",
                pos: "top-center",
                timeout: 3000
            });
        });
    };

    render() {
        return (
            <div className="uk-section uk-section-default uk-width-expand uk-margin-large-top uk-padding-small">
                <div className="uk-flex uk-flex-between">
                    <p>Pending Friend Requests</p>
                </div>
                <table className="uk-table uk-table-divider uk-table-middle uk-margin-top">
                    <tbody>
                        {this.props.requests.map(friend => (
                            <tr>
                                <td className="uk-text-left table-10">
                                    <img
                                        className="profileImage"
                                        alt="profile"
                                        src={friend.imageUrl}
                                    />
                                </td>
                                <td className="uk-text-left table-80">
                                    <Link
                                        to={"/profile/" + friend.username}
                                        className="uk-link-reset"
                                    >
                                        {friend.fullName}
                                    </Link>
                                </td>
                                <td className="uk-text-center table-10">
                                    <div
                                        onClick={() =>
                                            this.acceptRequest(friend.id)
                                        }
                                    >
                                        <span uk-icon="icon: check" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PendingFriends;
