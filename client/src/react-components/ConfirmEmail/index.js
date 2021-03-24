import React from "react";
import Header from "../Header";
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

import "./styles.css";

// Importing actions/required methods
import { validateEmailToken, confirmEmail } from "../../actions/userLogin";

/* The Dummy Login Screen Component */
class ConfirmEmail extends React.Component {
  ///  React 'state'.
  // Allows us to keep track of chagning data in this component.
  constructor(props) {
    super(props);

    const token =  this.props.match.params.token;

    this.state = {
      token: token,
      username: "",
      title: "",
      text1: "",
      text2: "",
      continueFlag: false
    };
  };

  componentDidMount() {
    validateEmailToken(this);
  }

  appChangeState = this.props.appChangeState;

  confirmEmail = () => {
    confirmEmail(this);
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
                  onClick={this.confirmEmail}
                  className="form-button"
                >
                  Continue
                </Button>
              </Paper>
          </Container>
        </React.Fragment>
      );
    }
  }
}

export default ConfirmEmail;
