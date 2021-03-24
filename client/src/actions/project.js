/**
 * Actions in this file modify or retrive info about projects.
*/
import {SERVER_URL} from '../common/server_config';

 /**
  * Get a details object about the project with the given id
  * Call the callback function with the details object.
  */
export const getProjectDetails = (projectId, callback) => {
    // call to server
    const url = SERVER_URL + '/api/project/' + projectId;
    
    // fetch using get (the default method used by fetch)
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get project details.");
            }
        })
        .then(json => {
            // call callback with json body
            callback(json);
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Add a new project.
 * @param details an object of {title, description, peopleDescription, additional}
 * @param user the username of the user to whom this project belongs
 */
export const createProject = (details, callback) => {
    // call to server
    const url = SERVER_URL + '/api/project'

    // Since we aren't just doing a GET, create a request to use with fetch
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(details),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(function (res) {
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            alert("Project created.")
            if (callback) {
                callback()
            }
        } else {
            alert("Could not create project.")
        }
    })
    .catch(error => {
        alert("Could not create project.")
        console.log(error);
    });
}

/**
 * Update an existing project
 * @param projectId the id of the project to update
 * @param details an object of {title, description, peopleDescription, additional}
 */
export const updateProject = (projectId, details) => {
    // call to server
    const url = SERVER_URL + "/api/project/" + projectId;
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(details),
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
                alert("Project successfully updated.")
            } else {
                alert("Error updating project.");
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Return a list of projects that match the given search text and filters.
 * @param text search keywords
 * @param filters an object consisting of difficulties: [String],
 * requiredSkills: [String], requiredCourses: [String].
 * @returns a list of projectIds of projects that match the given criterea
 */
export const searchProjects = (text, filters, callback) => {
    // server call
    let url = SERVER_URL + `/api/search/project?term=${text}`
    if (filters.difficulty) {
        url += `&filters[difficulty]=${filters.difficulty}`
    }
    if (filters.skills) {
        for (const skill of filters.skills) {
            url += `&filters[skills]=${skill}`
        }
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
 * Flag the project as inappropriate.
 * @param projectId id of the project to flag.
 */
export const flagProject = (projectId) => {
    // server call
    const url = SERVER_URL + '/api/flag/project/' + projectId;

    const request = new Request(url, {
        method: "post"
    });

    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                alert("Project successfully flagged.")
            } else {
                alert("Could not flag project.")
            }
        })
        .catch(error => {
            console.log(error);
        });
}