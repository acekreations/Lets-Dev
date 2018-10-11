import React, { Component } from "react";
import { Link } from "react-router-dom";

class Rank extends Component {
    render() {
        return (
            <table className="uk-table uk-table-divider uk-table-middle">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th></th>
                        <th></th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="uk-width-auto">{this.props.rank}</td>
                        <td className="uk-width-auto"><img className="profileImage" alt="profile" src={this.props.profileImage}></img></td>
                        <td className="uk-width-expand uk-text-left"><Link to={"/"} className="uk-link-reset">{this.props.name}</Link></td>
                        <td className="uk-width-auto uk-text-right">{this.props.activity}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Rank;