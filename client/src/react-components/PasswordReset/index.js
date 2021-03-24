import React from "react";
import Header from "../Header";
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';

import "./styles.css";

// Importing actions/required methods
import { passwordReset, validatePasswordToken} from "../../actions/userLogin";

class PasswordReset extends React.Component {
  ///  React 'state'.
  // Allows us to keep track of chagning data in this component
  constructor(props) {
    super(props);

    let token = "";
    let username = "";

    // Call PasswordReset from email link
    if (this.props.match.params.token) {
      token = this.props.match.params.token;
    } else { // PasswordReset for logged in user
      username = this.props.state.username;
    }

    this.state = {
      username: username,
      token: token,
      newPassword: {
        value: "",
        helperText: ""
      },
      confirmPassword: {
        value: "",
        helperText: ""
      },
      displayMessage: false,
      title: "",
      text1: "",
      text2: "",
      continueFlag: false
    };
  };

  componentDidMount() {
    if (! this.state.username) {
      // We expect a valid token
      validatePasswordToken(this);
    }
  }

  // Generic handler for whenever we type in an input box.
  // We change the state for the particular property bound to the textbox from the event.
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let current = this.state[name];
    current["value"] = value;
    current["helperText"] = "";

    this.setState({
      [name] : current
    });
  };

  passwordReset = () => {
    passwordReset(this);
  }

  render() {
    if (this.state.continueFlag) {
      return (
        <React.Fragment>
          <Redirect to="/"/>
        </React.Fragment>
      );
    } else if (this.state.displayMessage) {
      return (
        <React.Fragment>
          <Header state={this.props.state} />
          <Container maxWidth="xs">
            <Paper className="paper" elevation={0}>
              <Typography component="h1" variant="h5">
              {this.state.title}
              </Typography>
              <Typography variant="body2">
              {this.state.text1}
              </Typography>
              <Typography variant="body2">
              {this.state.text2}
              </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.passwordReset}
                  className="form-button"
                >
                  Continue
                </Button>
              </Paper>
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Header state={this.props.state} />
          <Container maxWidth="xs">
            <Paper className="paper" elevation={3}>
              <Typography component="h1" variant="h5">
              Password Reset
              </Typography>
              <form>
                <TextField
                  name="newPassword"
                  label="Password"
                  id="newPassword"
                  helperText={this.state.newPassword.helperText}
                  className="input"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  onChange={this.handleChange}
                />
                <TextField
                  name="confirmPassword"
                  label="Confirm password"
                  id="confirmPassword"
                  helperText={this.state.confirmPassword.helperText}
                  className="input"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  onChange={this.handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.passwordReset}
                  className="form-button"
                >
                Reset Password
                </Button>
              </form>
            </Paper>
          </Container>
        </React.Fragment>
      );
    }
  }
}

export default PasswordReset;
