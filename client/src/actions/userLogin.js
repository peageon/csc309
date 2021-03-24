/**
 * Actions in this file are used for login in and signing up a user
 *
 */

import {SERVER_URL} from "../common/server_config.js"

// A function to send a POST request with the user to be logged in
export const login = login => {

    let url = SERVER_URL + "/api/users/login";
    let user = {};
    let isValidInput = false;
    let errorMsg = "";

    const isEmail = isEmailAddress(login.state.username.value);

    if (isEmail) {
      user = {
        email: login.state.username.value,
        password: login.state.password.value
      };
      url =  url + "/email";
      [isValidInput, errorMsg] = validateEmailAddress(user.email);
    } else {
      user = {
        username: login.state.username.value,
        password: login.state.password.value
      };
      [isValidInput, errorMsg] = validateUsername(user.username);
    }

    if (isValidInput) {
      if (! user.password) {
        setHelperText(login, "password", "Please enter the password");
      } else {

        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: "post",
            body: JSON.stringify(user),
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
                if (json.username) {
                  login.appChangeState("username", json.username);
                } else if (json.error) {
                  login.setState({
                    errorText : json.error
                  });
                } else {
                  login.setState({
                    errorText : "Unable to login"
                  });
                }
            })
            .catch(error => {
                console.log(error);
                login.setState({
                  errorText : "Unable to login"
                });
            });
      }
    } else {
      setHelperText(login, "username", errorMsg);
    }
};

// A function to logout the user
export const logout = logout => {

    let url = SERVER_URL + "/api/users/logout";

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
            logout.appChangeState("username", "");
        })
        .catch(error => {
            console.log(error);
        });
}

// A function to send a POST request with the user to be signedUp
export const signUp = signUp => {

  if (validateSignUp(signUp)) {

    const user = {
      username: signUp.state.newUser.value,
      email: signUp.state.newEmail.value,
      password: signUp.state.newPassword.value
    }

    const url = SERVER_URL + "/api/users";
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(user),
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
            if (json.username === user.username) {
              signUp.setState({
                "newUserAdded" : true
              });
            } else if (json.error) {
              signUp.setState({
                errorText : json.error
              });
            } else {
              signUp.setState({
                errorText : "Unable to sign up"
              });
            }
        })
        .catch(error => {
            console.log(error);
            signUp.setState({
              errorText : "Unable to sign up"
            });
        });
  }
}

export const validateSignUp = signUp => {
  const newUser = signUp.state.newUser.value;
  const newEmail = signUp.state.newEmail.value;
  const newPassword = signUp.state.newPassword.value;
  const confirmPassword = signUp.state.confirmPassword.value;

  let isValid = false;
  let flag = false;
  let msg = "";

  [flag, msg]  = validateUsername(newUser);
  setHelperText(signUp, "newUser", msg);
  isValid = flag;

  [flag, msg]  = validateEmailAddress(newEmail);
  setHelperText(signUp, "newEmail", msg);
  isValid = isValid && flag;

  [flag, msg]  = validatePassword(newPassword);
  setHelperText(signUp, "newPassword", msg);
  isValid = isValid && flag;

  [flag, msg]  = validateConfirmPassword(confirmPassword, newPassword);
  setHelperText(signUp, "confirmPassword", msg);
  isValid = isValid && flag;

  return isValid;

}

export const setHelperText = (component, name, helperText) => {
  let current = component.state[name];
  current["helperText"] = helperText;

  component.setState({
    [name] : current
  });

}

export const passwordReset = passwordReset => {

  if (passwordReset.state.displayMessage) {
    // if the screen display a message, continue
    passwordReset.setState({
      continueFlag : true
    });
    return;
  }

  const username = passwordReset.state.username;
  const newPassword = passwordReset.state.newPassword.value;
  const confirmPassword = passwordReset.state.confirmPassword.value;

  let isValid = false;
  let flag = false;
  let msg = "";

  [flag, msg]  = validatePassword(newPassword);
  setHelperText(passwordReset, "newPassword", msg);
  isValid = flag;

  [flag, msg]  = validateConfirmPassword(confirmPassword, newPassword);
  setHelperText(passwordReset, "confirmPassword", msg);
  isValid = isValid && flag;

  if (isValid) {

    const url = SERVER_URL + "/api/users/login/resetPassword";
    const body = {
      username: username,
      password: newPassword
    };

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if ((res.status === 200) || (res.status === 404)) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.username) {
              updatePasswordResetText(passwordReset, false, true);
            } else {
              console.log(json);
              updatePasswordResetText(passwordReset, false, false);
            }
        })
        .catch(error => {
            console.log(error);
            updatePasswordResetText(passwordReset, false, false);
        });
  }
};

export const validatePasswordToken = passwordReset => {

  // If the token is valid allow the password change,
  // otherwise display error message
  if (! passwordReset.state.token) {
    updatePasswordResetText(passwordReset, true, false);
  }

  // Verify token against the server
  const url = SERVER_URL + "/api/users/login/validateReset/" +
              passwordReset.state.token;

  const request = new Request(url, {
      method: "GET",
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
          if (json && json.username) {
            passwordReset.setState({
              username: json.username
            });
          } else {
            console.log(json);
            updatePasswordResetText(passwordReset, true, false);
          }
      })
      .catch(error => {
          console.log(error);
          updatePasswordResetText(passwordReset, true, false);
      });

};

export const updatePasswordResetText = (passwordReset, invalidToken, resetOk) => {
  let title = "";
  let text1 = "";
  let text2 = "";

  if (invalidToken) {
    title = "Error";
    text1 = "Invalid password reset link.";
    text2 = "Please check your email reset link and try again.";
  } else if (resetOk) {
    title = "Success"
    text1 = "Your password was reset.";
    text2 = "Click Continue to go to the main screen.";
  } else {
    title = "Error";
    text1 = "Unable to reset your password. You can try again later.";
    text2 = "Click Continue to go to the main screen.";
  }

  passwordReset.setState({
    title: title,
    text1: text1,
    text2: text2,
    displayMessage: true
  });
}

export const validateEmailToken = confirmEmail => {
  // If a token is provided, valodate it against the server
  if (confirmEmail.state.token) {
    const url = SERVER_URL + "/api/users/activate/" + confirmEmail.state.token;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify({}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if ((res.status === 200) || (res.status === 404)) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.username) {
              updateConfirmEmailText(confirmEmail, false, true);
              confirmEmail.setState({
                username: json.username
              });
            } else {
              console.log(json);
              updateConfirmEmailText(confirmEmail, false, false);
            }
        })
        .catch(error => {
            console.log(error);
            updateConfirmEmailText(confirmEmail, false, false);
        });

  } else {
    updateConfirmEmailText(confirmEmail, true, false);
  }
}

export const updateConfirmEmailText = (confirmEmail, isEmpty, isValid) => {
  let title = "Thank you !";
  let text1 = "";
  let text2 = "";

  if (isEmpty) {
    text1 = "A confirmation email has been sent to the email address provided.";
    text2 = "Please check your email and click on the confirmation link to complete your registration.";
  } else if (isValid) {
    text1 = "Your email address has been confirmed and your account is now active.";
    text2 = "Click Continue to go to the main screen.";
  } else {
    title = "Error";
    text1 = "Invalid confirmation link.";
    text2 = "Please check your email confirmation link and try again.";
  }

  confirmEmail.setState({
    title: title,
    text1: text1,
    text2: text2
  });
}

export const confirmEmail = confirmEmail => {
  if (confirmEmail.state.username) {
    confirmEmail.appChangeState("username", confirmEmail.state.username);
  }

  confirmEmail.setState({
    continueFlag : true
  });

}

export const forgotPassword = forgotPassword => {

  if (! forgotPassword.state.username) {
    forgotPassword.setState({
      continueFlag : false,
      helperText: "Invalid user or email address"
    });
    return;
  }

  // Verify user and send email
  let search = {};

  const isEmail = isEmailAddress(forgotPassword.state.username);

  if (isEmail) {
    search = {
      email: forgotPassword.state.username
    };
  } else {
    search = {
      username: forgotPassword.state.username
    };
  };

  const request = new Request(SERVER_URL + "/api/users/login/forgot", {
      method: "post",
      body: JSON.stringify({search: search}),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
      }
  });

  // Send the request with fetch()
  fetch(request)
      .then(res => {
          if ((res.status === 200) || (res.status === 400) || (res.status === 404)) {
              return res.json();
          }
      })
      .then(json => {
          let flag = false;
          let msg = "";
          if (json.username) {
            flag = true;
          } else if (json.error) {
            msg = json.error;
          } else {
            msg = "Invalid request";
          }
          forgotPassword.setState({
            continueFlag : flag,
            helperText: msg
          });

      })
      .catch(error => {
          console.log(error);
          forgotPassword.setState({
            continueFlag : false,
            helperText: "Invalid request"
          });
      });

}

const userPattern = new RegExp("^user[0-9]*$");
const adminPattern = new RegExp("^admin$");

export const isEmailAddress = (value) => {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(value));
}

export const validateUsername = (username) => {

  if (username &&
      (userPattern.test(username) ||
       adminPattern.test(username))) {
    return [true, ""];
  } else {
    return [false, "Invalid username"];
  }
}


export const validateEmailAddress = (email) => {
  if (email && isEmailAddress(email))  {
    return [true, ""];
  } else {
    return [false, "Invalid email address"];
  }
}

export const validatePassword = (password) => {
  if (password && (password.length >= 4)) {
    return [true, ""];
  } else {
    return [false,"Invalid password. Password must be at least 4 characters"];
  }
}

export const validateConfirmPassword = (confirmPassword, password) => {
  if (confirmPassword && (confirmPassword == password)) {
    return [true, ""];
  } else {
    return [false,"Confirm password different than password"];
  }
}
