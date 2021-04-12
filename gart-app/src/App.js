import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {PrivateRoute} from "./actions/auth"
//Pages
import ReactDOM from "react-dom"
import Welcome from "./pages"; 
import mainpage from "./pages/mainpage";
import registerpage from "./pages/register"
import login from "./pages/login";
import error from "./pages/404";
import upload from "./pages/upload"
import MyComponent from "./pages/account"
import Profile from './pages/post/profile'
import Permalink from './pages/post/permaPost'
import Edit from "./pages/edit/edit"
import NavBar from './pages/Nav/navbar'
import Delete from './pages/delete'
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={login} />
        <Route exact path="/main" component={mainpage} />
        <Route exact path="/404" component={error} />
        <Route exact path="/register" component={registerpage} />
        <Route exact path="/upload" component={upload} />
        <Route exact path="/account" component={MyComponent} />
        <Route exact path="/@:username" component={Profile} />
        <Route exact path="/post/:postId" component={Permalink} />
        <Route exact path="/edit/:postId" component={Edit} />
        <Route exact path="/nav" component={NavBar} />
        <Route exact path="/delete" component={Delete} />
        
        <Redirect to="/404" /> 
        </Switch>
      </Router>
    )
  }
}

export default App;



