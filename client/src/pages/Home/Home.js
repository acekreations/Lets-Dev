import React, { Component } from "react";
import { Link } from "react-router-dom";
import Stats from "../../components/Stats";

class Home extends Component {
    render(){
        return (
            <Stats actions="104" rank="4" globalRank="1286"/>
        )
    }
}

export default Home;