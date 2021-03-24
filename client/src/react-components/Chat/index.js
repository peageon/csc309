import React from "react";
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import "./styles.css";


/** List of Recent chats for a user. */
class Chat extends React.Component {

    render() {

        let chat = this.props.chat;

        return (
          <React.Fragment>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={chat.from}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"From: " + chat.from + " To: " + chat.to}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                        {chat.subject}
                        </Typography>
                        : {chat.messageText}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
          </React.Fragment>
        );
    }
}

export default Chat;
