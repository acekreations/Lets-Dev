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
                            <td className="uk-width-auto">{item.fullName}</td>
                            <td className="uk-width-auto">
                                <img
                                    className="profileImage"
                                    alt="profile"
                                    src={item.profileImage}
                                />
                            </td>
                            <td className="uk-width-expand uk-text-left">
                                <Link
                                    to={"/profile" + item.username}
                                    className="uk-link-reset"
                                >
                                    {item.fullName}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Rank;
