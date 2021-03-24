import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Login from './react-components/Login';
import Logout from './react-components/Logout';
import SignUp from './react-components/SignUp';
import ConfirmEmail from './react-components/ConfirmEmail';
import ForgotPassword from './react-components/ForgotPassword';
import PasswordReset from './react-components/PasswordReset';
import UserSearch from './react-components/UserSearch';
import Projects from './react-components/Projects';
import ProjectDetail from './react-components/ProjectDetail';
import CreateProject from './react-components/CreateProject';
import UserProfile from './react-components/UserProfile';
import ChatRoom from './react-components/ChatRoom';

import {users} from "./common/data.js";

class App extends React.Component {

  /** Global state for our app. */
//  state = {
    /** The user that is currently logged in. This should be set at login. */
  //  username: "user" // I'm setting it for now, but we will have to make it uninitialized at first.
  //};

  constructor(props) {
    super(props);
    this.state = {username: "",
                  userlist: users};
  }

  changeState = (name, value) => {
    console.log("change state:", name, value);
    this.setState({
      [name] : value
    });
  };

  isLoggedIn = () => {
    if (this.state.username) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    console.log("render app", this.state);

    if (!this.isLoggedIn()) {
      return (
        <div className="background__image">
        <div>
         <BrowserRouter>
           <Switch>
             <Route exact path='/login' render={() => (<Login state={this.state} appChangeState={this.changeState.bind(this)} />)} />
             <Route exact path='/signup' render={() => (<SignUp state={this.state} appChangeState={this.changeState.bind(this)} />)} />
             <Route exact path='/confirm' render={(props) => (<ConfirmEmail {...props} state={this.state} appChangeState={this.changeState.bind(this)} />)} />
             <Route exact path='/confirm/:token' render={(props) => (<ConfirmEmail {...props} state={this.state} appChangeState={this.changeState.bind(this)} />)} />
             <Route exact path='/forgot' render={() => (<ForgotPassword state={this.state} />)} />
             <Route exact path='/resetpassword/:token' render={(props) => (<PasswordReset {...props} state={this.state} />)} />
             <Redirect to="/login"/>
            </Switch>
          </BrowserRouter>
        </div>
        </div>
      );
    } else {
      return (
        <div className="background__image">
        <div>
          <BrowserRouter>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route exact path='/user-search' render={() => (<UserSearch state={this.state} />)} />
              <Route exact path='/projects' render={() => (<Projects state={this.state} />)} />
              <Route exact path='/project/:projectId' render={() => <ProjectDetail state={this.state} />} />
              <Route exact path='/create-project' render={() => <CreateProject state={this.state} />} />
              <Route exact path='/user-profile' render={() => <UserProfile state={this.state} />} />
              <Route exact path='/logout' render={() => (<Logout appChangeState={this.changeState.bind(this)} />)} />
              <Route exact path='/chat' render={() => <ChatRoom state={this.state} />} />
              { /* Redirect to the default page for logged in users */}
              <Redirect to="/projects"/>
            </Switch>
          </BrowserRouter>
        </div>
        </div>
      );
    };
  }
}

export default App;
