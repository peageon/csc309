import React from "react";
import SearchBar from "../SearchBar";
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import "./styles.css";

// Importing actions/required methods
import { getChatUserProfile, sendChatMessage } from "../../actions/chat";

// Send message to user
class ChatMessage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            from : this.props.from,
            to : "",
            subject: "",
            message: "",
            userErrorText: "",
            messageErrorText: ""
        }

        this.handleSearch = this.handleSearch.bind(this)
    }

    changeUserProfile = this.props.changeUserProfile;
    refreshChats = this.props.refreshChats;

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name] : value,
          userErrorText: "",
          messageErrorText: ""
        });
    }

    handleSearch(term) {
        getChatUserProfile(this, term);
    }

    clearMessage = () => {
         let elem = document.getElementById('subject');
         elem.value = "";
         elem = document.getElementById('message');
         elem.value = "";
         this.setState({
            subject: "",
            message: ""
         });
    }

    sendMessage = () => {
        sendChatMessage(this);
    }

    render() {
          return (
            <React.Fragment>
              <Paper className="paper" elevation={0}>
                <Typography component="h1" variant="h5">
                   Search User
                </Typography>
                <SearchBar onSearch={this.handleSearch} />
                <Typography variant="body2" className="error-text">
                {this.state.userErrorText}
                </Typography>
                <div className="message">
                  <Typography variant="body2">
                  Send Message To
                  </Typography>
                  <Typography variant="body2">
                  {this.state.to}
                  </Typography>
                  <hr className="line" />
                  <TextField
                    id="subject"
                    name="subject"
                    label="Subject"
                    fullWidth
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="message"
                    name="message"
                    label="Message"
                    multiline
                    rows="5"
                    fullWidth
                    onChange={this.handleChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.sendMessage}
                    className="form-button"
                  >
                    Send Message
                  </Button>
                  <Typography variant="body2" className="error-text">
                  {this.state.messageErrorText}
                  </Typography>
                </div>
              </Paper>
            </React.Fragment>
          );
    }
}

export default ChatMessage;
