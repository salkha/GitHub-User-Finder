import React, { Component } from 'react';
import PropTypes from "prop-types";

export class Search extends Component {

    state = {
        text:" "
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChange = (event)=> { 
        this.setState({[event.target.name]: event.target.value}); //its pointing the "text" in 1st input name below
    }

    onSubmit = (event)=> { 
        event.preventDefault();

        if(this.state.text === " ") {
            this.props.setAlert("Please enter something", "light")
        } else {
            this.props.searchUsers(this.state.text);
             //this comes from app.js, props down means we are bringing the information from app.js. SearchUser what? the text from state :)
            this.setState({text: " "});
        }
        
    }

    clearUsers
    render() {
        return (
            <div>
                <form onSubmit= {this.onSubmit} className="form">
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Search Users..."
                        value={this.state.text}
                        onChange={this.onChange}/>
                    <input 
                        type="submit" 
                        value="search" 
                        className="btn btn-dark btn-block"/>
                </form>
                {this.props.showClear && (
                    <button 
                        className="btn btn-light btn-block" 
                        onClick= {this.props.clearUsers}        //we are sending up the information to app.js through props and its a terneri expression showed with &&, if both are true then do something
                    >Clear Users
                </button>)         
                }

            </div>
        )
    }
}

export default Search
