import React from "react";
import Header from "../Header";
import ChatList from "../ChatList";
import ChatUser from "../ChatUser";
import ChatMessage from "../ChatMessage";
import Grid from "@material-ui/core/Grid";

// Importing actions/required methods
import { getUserChats } from "../../actions/chat";

import "./styles.css";

/** The Project Chat Room. */
class ChatRoom extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentUser: this.props.state.username,
            messageUserProfile : {},
            chats: []
        }
    }

    componentDidMount() {
      console.log(" mount refresh list");

      getUserChats(this);
    }

    changeUserProfile = (userProfile) => {
      this.setState({
        messageUserProfile : userProfile
      });
    };

    refreshChats = () => {
      console.log("refresh list");
      getUserChats(this);
    }

    render() {
        return (
            <React.Fragment>
                <Header state={this.props.state} />
                <div>
                  <Grid container spacing={3}>
                    <Grid item xs>
                      <ChatList chats={this.state.chats} />
                    </Grid>
                    <Grid item xs>
                      <ChatMessage from={this.state.currentUser}
                         changeUserProfile={this.changeUserProfile.bind(this)}
                         refreshChats={this.refreshChats.bind(this)} />
                    </Grid>
                    <Grid item xs>
                      <ChatUser userProfile={this.state.messageUserProfile} />
                    </Grid>
                  </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default ChatRoom;
