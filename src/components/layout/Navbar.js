import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = (props) => {
    
        return (
            <nav className="navbar bg-primary">
                <h1>
                <i className={props.icon}/> {props.title}
                </h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>

            </nav>
        )
    
}

    Navbar.defaultProps = {
        title: "Default Title", // this is a default Prop, if there is no props, it will run automatically
        icon:"fab fa-github"
    }

    Navbar.propTypes = {
        title: PropTypes.string.isRequired,       //PropTypes needs to be imported and it checks if proptype is a string or number or boolean
        icon: PropTypes.string.isRequired
    };


export default Navbar
