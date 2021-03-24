/**
 * Actions in this file are used for the Chat Room
 *
 */

import {getUserProfile} from "./user.js"
import {SERVER_URL} from "../common/server_config.js"

export const getUserChats = chatRoom => {

  const username = chatRoom.state.currentUser;

  // Create our request constructor with all the parameters we need
  const url = SERVER_URL + "/api/messages/" + username;
  const request = new Request(url, {
      method: "get",
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
      }
  });

  // Send the request with fetch()
  fetch(request)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .then(json => {
          if (Array.isArray(json)) {
            chatRoom.setState({chats: json});
          }
      })
      .catch(error => {
          console.log(error);
      });
}

export const getChatUserProfile = (chatMessage, search) => {
    getUserProfile(search).then(result => {
        let username = "";
        let userProfile = {};
        let errorMessage = "";

        if (result) {
          if (result.username) {
            username = result.username;
            userProfile = result;
          } else if (result.error) {
            errorMessage = result.error
          } else {
            errorMessage = "Unable to get user data"
          }
        }

        chatMessage.setState({
          to: username,
          userErrorText: errorMessage
        });
        chatMessage.changeUserProfile(userProfile);

    })
}

// A function to send a POST request with the user to be signedUp
export const sendChatMessage = chatMessage => {

    const msg = {
      from: chatMessage.state.from,
      to: chatMessage.state.to,
      subject: chatMessage.state.subject,
      messageText: chatMessage.state.message
    };

    const url = SERVER_URL + "/api/messages";
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(msg),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if ((res.status === 200) || (res.status === 400)) {
                return res.json();
            }
        })
        .then(json => {
            console.log(json);
            if (json.from) {
              chatMessage.clearMessage();
              chatMessage.refreshChats();
              chatMessage.setState({
                messageErrorText : "Message Sent"
              });
            } else if (json.error) {
              chatMessage.setState({
                messageErrorText : json.error
              });
            } else {
              chatMessage.setState({
                messageErrorText : "Unable to send message"
              });
            }
        })
        .catch(error => {
            console.log(error);
            chatMessage.setState({
              messageErrorText : "Unable to send message"
            });
        });
}
