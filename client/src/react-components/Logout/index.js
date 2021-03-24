import React from "react";
import { Redirect } from 'react-router-dom';

// Importing actions/required methods
import { logout } from "../../actions/userLogin";

class Logout extends React.Component {

  appChangeState = this.props.appChangeState;

  componentDidMount() {
    logout(this);
  }

  render() {
     return (
        <React.Fragment>
          <Redirect to="/login"/>
        </React.Fragment>
      );
  };
}

export default Logout;
