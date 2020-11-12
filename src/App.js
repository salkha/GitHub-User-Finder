import React, {Fragment,Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import './App.css';

class App extends Component {

  state = {
    users: [],
    user:{},
    loading:false,
    alert: null
  };


  async componentDidMount() {
  
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_ID}&client_secret=${process.env.REACT_APP_SECRET}`);

    this.setState({users: res.data, loading: false});
  }
  //Search github users, this txt is coming from input from search.js through props

  searchUsers = async (text)=>{

    this.setState({loading: true})
    
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_ID}&client_secret=${process.env.REACT_APP_SECRET}`);

    this.setState({users: res.data.items, loading: false}); //here using res.data.items
  }

  //Clear users from state
  clearUsers = () =>{
    this.setState({ users: [], loading: false})
  }
  //Alert set
  setAlert =(msg, type)=>{
    this.setState({alert: {msg: msg, type: type}});

    setTimeout(() => this.setState({alert: null}), 3000)
  };
  //get a single Github user
  getUser = async (userName) => {
      this.setState({ loading: true});

      const res = await axios.get(`https://api.github.com/users/${this.username}&client_id=${process.env.REACT_APP_ID}&client_secret=${process.env.REACT_APP_SECRET}`); //end-port

      this.setState({users: res.data, loading: false}); //here using res.data ()data.items for searching anything

  }
 
  render () {

    return (
      <Router>
      <div className="App">

        <Navbar title="Github-Finder" icon="fab fa-github"/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
              <Route 
                exact path="/" 
                render={ (props) => {
                  return (<Fragment>
                      <Search 
                        searchUsers={this.searchUsers} 
                        clearUsers={this.clearUsers}
                        showClear={this.state.users.length>0? true:false}
                        setAlert={this.setAlert}
                      />
                      <Users loading ={this.state.loading} users= {this.state.users}/>
                  </Fragment>)
              }}/>
              <Route exact path ="/about" component={About}/>  
          </Switch>
        </div>        
      </div>
      </Router>
    );
  }

}

export default App;
