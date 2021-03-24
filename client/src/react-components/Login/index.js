import React from "react";
import Header from "../Header";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import "./styles.css";

// Importing actions/required methods
import { login } from "../../actions/userLogin";

/* The Dummy Login Screen Component */
class Login extends React.Component {
  ///  React 'state'.
  // Allows us to keep track of chagning data in this component.
  state = {
    username: {
      value: this.props.state.username,
      helperText: ""
    },
    password: {
      value: "",
      helperText: ""
    },
    errorText: ""
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

  login = () => {
    login(this);
  };

  render() {
    return (
      <React.Fragment>
        <Header state={this.props.state} />
        <Container maxWidth="xs">
          <Paper className="paper" elevation={3}>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <form>
              {/* Inputs for login */}
              <TextField
                name="username"
                label="Username or email address"
                id="username"
                defaultValue={this.state.username.value || ""}
                helperText={this.state.username.helperText}
                className="input"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
                name="password"
                label="Password"
                id="password"
                helperText={this.state.password.helperText}
                className="password"
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
                    onClick={this.login}
                    className="form-button"
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs>
                  <Link component={RouterLink} to="/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Login;
