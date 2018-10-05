import React, { Component } from "react";
import Stats from "../../components/Stats";

class Profile extends Component {
    state = {
        name: "Craig Melvillle",
        username: "acekreations",
        profileImage: "https://via.placeholder.com/350x350",
        githubURL: "https://github.com/acekreations"
    };
    
    componentDidMount() {
        this.loadProfile();
      }
    
    loadProfile = () => {
        console.log(this.props.match.params.username);
        
        //API call => set state
    };

    render() {
        return (
            <div className="uk-flex uk-flex-column uk-flex-middle">
                <img className="profileImageLg uk-margin-large-top" src={this.state.profileImage}></img>
                <p className="uk-margin-top uk-margin-small-bottom">{this.state.name}</p>
                <ul className="uk-iconnav">
                    <li><a href={this.state.githubURL} className="uk-link-reset" uk-icon="icon: github" uk-tooltip="Github Profile"></a></li>
                </ul>
                <Stats actions="104" rank="4" globalRank="1286" />
            </div>
        )
    }
}

export default Profile;