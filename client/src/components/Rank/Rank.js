import React, { Component } from "react";
import { Link } from "react-router-dom";

class Rank extends Component {
    render() {
        return (
            <table className="uk-table uk-table-divider uk-table-middle">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th />
                        <th />
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.friends.map((item, index) => (
                        <tr key={index}>
                            <td className="uk-width-auto">{index + 1}</td>
                            <td className="uk-width-auto">
                                <img
                                    className="profileImage"
                                    alt="profile"
                                    src={item.imageUrl}
                                />
                            </td>
                            <td className="uk-width-expand uk-text-left">
                                <Link
                                    // {item.userName ? item.userName : item.username}
                                    to={
                                        item.userName
                                            ? `/profile/${item.userName}`
                                            : `/profile/${item.username}`
                                    }
                                    className="uk-link-reset"
                                >
                                    {item.fullName}
                                </Link>
                            </td>
                            <td className="uk-width-auto">{item.activity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Rank;
