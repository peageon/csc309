import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import "./styles.css";

/** List of Recent chats for a user. */
class ChatUser extends React.Component {

    render() {
        let userProfile = this.props.userProfile;

        if (userProfile && userProfile.username) {
          return (
            <React.Fragment>
              <Paper className="paper" elevation={0}>
                <Typography component="h1" variant="h5">
                   {userProfile.username}
                </Typography>
                <Typography variant="body2">
                  {userProfile.firstname} {userProfile.lastname}
                </Typography>
                <Typography variant="body2">
                  Year: {userProfile.year}
                </Typography>
                <Typography variant="body2">
                  Pey: {userProfile.pey}
                </Typography>
                <Typography variant="body2">
                  Skills: {userProfile.skills}
                </Typography>
              </Paper>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <Paper className="paper" elevation={0}>
                <Typography component="h1" variant="h5">
                   User Profile
                </Typography>
              </Paper>
            </React.Fragment>
          );
        }
    }
}

export default ChatUser;
