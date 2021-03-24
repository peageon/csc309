import React from "react";
import Header from "../Header";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import "./styles.css";

// Importing actions/required methods
import { forgotPassword } from "../../actions/userLogin";

class ForgotPassword extends React.Component {
  ///  React 'state'.
  // Allows us to keep track of chagning data in this component.
  state = {
    username: "",
    helperText: "",
    continueFlag: false
  };

  // Generic handler for whenever we type in an input box.
  // We change the state for the particular property bound to the textbox from the event.
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // 'this' is bound to the component in this arrow function.
    this.setState({
      [name]: value,
      helperText: ""
    });
  };

  forgotPassword = () => {
    forgotPassword(this);
  }

  render() {

    if (this.state.continueFlag) {
      return (
        <React.Fragment>
          <Redirect to="/"/>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Header state={this.props.state} />
          <Container maxWidth="xs">
            <Paper className="paper" elevation={3}>
              <Typography component="h1" variant="h5">
              Forgot Password
              </Typography>
              <Typography variant="body2">
              Please enter your username or email address and we will send you
              a password reset link.
              </Typography>
              <form>
                <TextField
                  name="username"
                  label="Username or email address"
                  id="username"
                  helperText={this.state.helperText}
                  className="input"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  onChange={this.handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.forgotPassword}
                  className="form-button"
                >
                Send link
                </Button>
                <Grid container className="other">
                  <Grid item xs>
                    <Link component={RouterLink} to="/login" variant="body2">
                      Login
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
}

export default ForgotPassword;
