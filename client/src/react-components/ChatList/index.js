import React from "react";
import Chat from "../Chat";
import SearchBar from "../SearchBar";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import "./styles.css";

/** List of Recent chats for a user. */
class ChatList extends React.Component {
    render() {
        return (
          <React.Fragment>
            <Paper className="paper" elevation={0}>
              <Typography component="h1" variant="h5">
                 Recent messages
              </Typography>
              <List>
              {this.props.chats.map(chat => <Chat key={chat._id} chat={chat} />)}
              </List>
            </Paper>
          </React.Fragment>
        );
    }
}

export default ChatList;
