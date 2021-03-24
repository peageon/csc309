/**
 * Actions in this file modify or retrive info users.
 */
import {SERVER_URL} from '../common/server_config';

 /**
  * Return the path of the profile picture of the given user.
  * @param username the username of the user to look up
  */
export const getProfilePic = (username) => {
    return '/user1ProfilePic.png';
}

// Update the info of a user
export const updateUserInfo = (userDetails) => {
    let url = SERVER_URL + `/api/users/${userDetails.username}`
    if (!userDetails.skills) {
        userDetails.skills = []
    }
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(userDetails),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // Tell the user of the great success.
                alert("User successfully updated.")
            } else {
                alert("Error updating user.");
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Return a list of users that match the given search text and filters.
 * @param text search keywords
 * @param filters an object consisting of year (number), PEY (boolean),
 *          skills (all arrays).
 * @returns a list of usernames of users that match the given criterea
 */
export const searchUsers = (text, filters, callback) => {
    // server call
    // basic implementation for now
    let url = SERVER_URL + `/api/search/users/?term=${text}`
    if (filters.year) {
        url += `&filters[year]=${filters.year}`
    }
    if (filters.requiredSkills) {
        for (const skill of filters.requiredSkills) {
            url += `&filters[requiredSkills]=${skill}`
        }
    }
    if (filters.pey) {
        url += `&filters[pey]=${filters.pey}`
    }
    
    fetch(url)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not perform search.")
            }
        })
        .then(json => {
            callback(json);
        })
        .catch(error => {
            alert("Could not perform search.")
            console.log(error);
        });
}

/**
 * Return an object containing the user profile or an error object if the
 * user was not found or there was a server error
 * @param username the username of the user to look up
 */
export const getUserProfile = (username) => {

  // Create our request constructor with all the parameters we need
  const request = new Request(SERVER_URL + "/api/users/" + username, {
      method: "get",
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
      }
  });

  return new Promise((resolve, reject) => {
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if ((res.status === 200) || (res.status === 400)) {
                return res.json();
            }
        })
        .then(json => {
            if (json.username) {
              resolve(json);
            } else if (json.error) {
              console.log(json.error);
              resolve(json);
            } else {
              console.log(json);
              resolve({error: "Unable to get user profile"})
            }

        })
        .catch(error => {
            console.log(error);
            resolve({error: "Unable to get user profile"})
        });
  })
}
