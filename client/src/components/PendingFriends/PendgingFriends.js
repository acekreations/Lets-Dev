import React, { Component } from "react";
import { Link } from "react-router-dom";

class PendingFriends extends Component {
    render() {
        return (
            <div className="uk-section uk-section-default uk-width-expand uk-margin-large-top uk-padding-small">
                <div className="uk-flex uk-flex-between">
                    <p>Pending Friend Requests</p>
                </div>
                <table className="uk-table uk-table-divider uk-table-middle uk-margin-top">
                    <tbody>
                        {this.props.pendingFriends.map(friend => (
                            <tr>
                                <td className="uk-text-left table-10">
                                    <img
                                        className="profileImage"
                                        alt="profile"
                                        src={friend.profileImage}
                                    />
                                </td>
                                <td className="uk-text-left table-80">
                                    <Link
                                        to={friend.username}
                                        className="uk-link-reset"
                                    >
                                        {friend.name}
                                    </Link>
                                </td>
                                <td className="uk-text-center table-10">
                                    <span uk-icon="icon: check" />
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
