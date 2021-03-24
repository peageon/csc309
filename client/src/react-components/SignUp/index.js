import React from "react";
import Header from "../Header";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, Redirect } from 'react-router-dom';

// Importing actions/required methods
import { signUp } from "../../actions/userLogin";

import "./styles.css";

/* The Dummy Login Screen Component */
class SignUp extends React.Component {
  ///  React 'state'.
  // Allows us to keep track of chagning data in this component.
  state = {
    newUser: {
      value: "",
      helperText: ""
    },
    newEmail: {
      value: "",
      helperText: ""
    },
    newPassword: {
      value: "",
      helperText: ""
    },
    confirmPassword: {
      value: "",
      helperText: ""
    },
    errorText: "",
    newUserAdded : false
  };

  appChangeState = this.props.appChangeState;

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

    this.setState({
      errorText: ""
    });
  };

  signUp = () => {
    signUp(this);
  };

  render() {
    if (this.state.newUserAdded) {
      return (
        <React.Fragment>
          <Redirect to="/confirm"/>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Header state={this.props.state} />
          <Container maxWidth="xs">
            <Paper className="paper" elevation={3}>
              <Typography component="h1" variant="h5">
              Sign up
              </Typography>
              <form>
                <TextField
                  name="newUser"
                  label="Username"
                  id="newUser"
                  helperText={this.state.newUser.helperText}
                  className="input"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={this.handleChange}
                />
                <TextField
                  name="newEmail"
                  label="Email address"
                  id="newEmail"
                  helperText={this.state.newEmail.helperText}
                  className="input"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={this.handleChange}
                />
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
                <Grid container className="other">
                  <Grid item xs={6}>
                    <Typography variant="body2" className="error-text">
                    {this.state.errorText}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.signUp}
                      className="form-button"
                    >
                      Sign up
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Link component={RouterLink} to="/login" variant="body2">
                      Login
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </React.Fragment>
      );
    }
  }
}

export default SignUp;
