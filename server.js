/**
 * Inspired by server.js found in:
 * mark-kazakevich, react-express-authentication repo
 */

"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

const cors = require('cors');
app.use(cors());

// to send emails
const { sendEmail } = require("./common/email");

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import mongoose models
const { Project, difficulties } = require('./models/project')
const { User } = require("./models/user");
const { Message } = require("./models/message");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/

// session handling here
// Create a session cookie
app.use(
    session({
        secret:"projects",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

/*********************************************************/

/*** API Routes below ************************************/
/* NOTE: all api routes should be of the form '/api/<route>' to avoid
    confusion with our front-end routes. */

/** Project routes **/

/** A route to create a new project.
 * The request body should contain all the required fields.
 * requiredSkills and requiredCourses should be arrays of strings.
 * Returns the created document.
 */
app.post("/api/project", (req, res) => {
    // Create the new project with mongoose model
    const project = new Project({
        title: req.body.title,
        poster: req.body.poster,
        description: req.body.description,
        peopleDescription: req.body.peopleDescription,
        additional: req.body.additional,
        requiredSkills: req.body.requiredSkills,
        //requiredCourses: req.body.requiredCourses,
        difficulty: req.body.difficulty,
        flagged: req.body.flagged
    })

    project.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error)
    })
})

// A route to get all projects.
app.get("/api/project", (req, res) => {
    Project.find().then((projects) => {
        res.send(projects)
    }, error => {
        res.status(500).send()
    })
})

// A route to get a project by ID. Returns the project document.
app.get("/api/project/:id", (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Project.findById(id).then((project) => {
        if (!project) {
            res.status(404).send(); // could not find this project
        } else {
            res.send(project);
        }
    }).catch(error => {
        res.status(500).send()
    })
})

/** A route to update a project by ID. Returns the new version of the document.
 * Request body should be what would be sent for a new project, but some fields
 * may be omitted.
 */
app.patch("/api/project/:id", (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return
    }

    Project.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
    .then(project => {
        if (!project) {
            res.status(404).send()
        } else {
            res.send(project)
        }
    }).catch(error => {
        res.status(500).send()
    })
})

// A route to delete a project by ID. Returns the deleted document.
app.delete("/api/project/:id", (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Project.findByIdAndDelete(id).then((project) => {
        if (!project) {
            res.status(404).send(); // could not find this project
        } else {
            res.send(project);
        }
    }).catch(error => {
        res.status(500).send()
    })
})

/** A route to get projects given a certain search term and filters.
 * Search term should be query param called "term".
 * I.E.: /api/search/project?term=<search text>
 * Filters are also query param, should be object containing difficulties: [String],
 * requiredSkills: [String], requiredCourses: [String].
 * Returns projects that have, eg, any of their required skills in the given array.
 */
app.get('/api/search/project', (req, res) => {
    const term = req.query.term;

    let filtersParam = {};
    if (req.query.filters) {
        filtersParam = req.query.filters;
    }


    // Prepare filters. Let me (Ian) know if you know a nicer way to do this.
    const filters = {}
    for (const filter in filtersParam) { // relies on filters in body all being arrays
        if (filter == "difficulty") {
            if (!filters["$and"]) {
                filters["$and"] = []
            }
            filters["$and"].push({difficulty: {$in: [filtersParam.difficulty]}})
        }
        else if (filter) {
            if (!filters["$and"]) {
                filters["$and"] = []
            }
            filters["$and"].push({[filter]: {$elemMatch: {$in: req.body[filter]}}})
            /* ^ ensure that at least one of the project's values is in the given array */
        }
    }

    if (term) {
        const reg = new RegExp(term, "i")
        filters["$or"] = [
            {title: reg},
            {description: reg},
            {peopleDescription: reg},
            {additional: reg}
        ]
        /* ^ Check if the term matches any relevant fields */
    }

    // Perform the actual search
    Project.find(filters).then((projects) => {
        res.send(projects)
    }, (error) => {
        res.status(500).send()
    })
})

// A route to flag a project. Returns the new version of the project
app.post("/api/flag/project/:id", (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return
    }

    Project.findByIdAndUpdate(id, {flagged: true}, {new: true, runValidators: true})
    .then(project => {
        if (!project) {
            res.status(404).send()
        } else {
            res.send(project)
        }
    }).catch(error => {
        res.status(500).send()
    })
})

// A route to unflag a project. Returns the new version of the project
app.delete("/api/flag/project/:id", (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return
    }

    Project.findByIdAndUpdate(id, {flagged: false}, {new: true, runValidators: true})
    .then(project => {
        if (!project) {
            res.status(404).send()
        } else {
            res.send(project)
        }
    }).catch(error => {
        res.status(500).send()
    })
})

// A route to get all flagged projects
app.get("/api/flag/project", (req, res) => {
    Project.find({flagged: true}).then((projects) => {
        res.send(projects)
    }, (error) => {
        res.status(500).send()
    })
})

/** User routes **/

// A route to login with a username and create a session
app.post("/api/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their username and password
    User.findUser(username, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.email = user.email;
            res.send({ username: user.username });
        })
        .catch(error => {
            res.status(400).send({error: error.message})
        });
});

// A route to login with an email and create a session
app.post("/api/users/login/email", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their username and password
    User.findUserByEmail(email, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.email = user.email;
            res.send({ username: user.username });
        })
        .catch(error => {
            res.status(400).send({error: error.message})
        });
});

// A route to logout a user
app.get("/api/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route for forgot password
app.post("/api/users/login/forgot", (req, res) => {

    if (! req.body.search) {
      res.status(400).send({error: "Invalid request"});
      return;
    }

    User.findOne(req.body.search).then(
        user => {
            if (user && user.username) {
              sendForgotPasswordEmail(user);
              res.send(user);
            } else {
              res.status(404).send({error: "User not found"});
            }
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// A route to validate the password reset token
app.get("/api/users/login/validateReset/:token", (req, res) => {
    const token = req.params.token;

    if (!ObjectID.isValid(token)) {
        res.status(400).send({error: "Invalid request"});
        return
    }

    User.findById(token)
     .then(
        user => {
            if (user && user.username) {
              res.send({username: user.username});
            } else {
              res.status(400).send({error: "Invalid request"});
            }
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// A route to change a user's password
// a PATH route to update user data
app.patch("/api/users/login/resetPassword", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username})
     .then(
        user => {
            if (user && user.username) {
              user.password = password;
              user.save().then(
                result => {
                  res.send(result);
                },
                error => {
                  log(error.message);
                  res.status(500).send(error); // server error
                });
            } else {
              res.status(404).send({error: "User not found"});
            }
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// A route to create a user
app.post("/api/users", (req, res) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        year: req.body.year,
        skills: req.body.skills,
        pey: req.body.pey,
        isActive: false
    })

    user.save().then(
      result => {
        res.send(result);
      },
      error => {
        log(error.message);
        let errorMessage = error.message;
        if (errorMessage.includes("duplicate key error")) {
          if (errorMessage.includes("username")) {
            errorMessage = "Username already exists"
          } else if ((errorMessage.includes("email"))) {
            errorMessage = "Email already exists"
          }
        } ;
        res.status(400).send({error: errorMessage}); // 400 for bad request
      }
    );
});

// a GET route to get all users
app.get("/api/users", (req, res) => {
    User.find().then(
        users => {
            res.send(users); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a GET route to get one user
app.get("/api/users/:username", (req, res) => {

    const username = req.params.username;

    User.findOne({username: username}).then(
        user => {
            if (user && user.username) {
              res.send(user);
            } else {
              res.status(404).send({error: "User not found"});
            }
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/** A route to get users given a certain search term and filters.
 * Search term should be query param called "term".
 * I.E.: /api/search/user?term=<search text>
 * Filters are also query param, should be object containing year: number,
 * skills: [String], pey: boolean.
 * Returns users that have, eg, any of their required skills in the given array.
 */
app.get('/api/search/users', (req, res) => {
    const term = req.query.term;

    let filtersParam = {};
    if (req.query.filters) {
        //console.log(req.query.filters)
        filtersParam = req.query.filters;
    }

    let filters = {}
    filters["$and"] = [];

    if (filtersParam.year) {
        filters["$and"].push({year: {$gte: filtersParam.year}})
    }

    if (filtersParam.skills) {
        filters["$and"].push({skills: {$elemMatch: {$in: req.body.skills}}})
    }

    if ("pey" in filtersParam) {
        filters["$and"].push({pey: filtersParam.pey})
    }

    if (filters["$and"].length === 0) {
        // none added
        filters = {}
    }

    if (term) {
        const reg = new RegExp(term, "i")
        filters["$or"] = [
            {username: reg},
            {email: reg},
            {firstName: reg},
            {lastName: reg}
        ]
        /* ^ Check if the term matches any relevant fields */
    }

    // Perform the actual search
    User.find(filters).then((users) => {
        res.send(users)
    }, (error) => {
        console.log(error)
        res.status(500).send()
    })
})

// a PATH route to update user data
app.patch("/api/users/:username", (req, res) => {

    const username = req.params.username;

    let newUserData = {};

    try {

      if (req.body.email) {
        newUserData.email = req.body.email;
      };

      if (req.body.firstName) {
        newUserData.firstName = req.body.firstName;
      }

      if (req.body.lastName) {
        newUserData.lastName = req.body.lastName;
      }

      if (req.body.year) {
        newUserData.year = req.body.year;
      }

      if (req.body.skills) {
        newUserData.skills = req.body.skills;
      }

      if ("pey" in req.body) {
        newUserData.pey = req.body.pey;
      }

      if (req.body.aboutMe) {
        newUserData.aboutMe = req.body.aboutMe;
      }

      if (req.body.courses) {
        newUserData.courses = req.body.courses;
      }
      
    } catch(error) {
        console.log(error)
      res.status(400).send({error: error.message});
      return;
    }

    User.findOneAndUpdate({username: username}, newUserData, {new: true})
     .then(
        user => {
            if (user && user.username) {
              res.send(user);
            } else {
              res.status(404).send({error: "User not found"});
            }
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});


// a PATCH route to activate user
app.patch("/api/users/activate/:id", (req, res) => {

    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return
    }

    User.findByIdAndUpdate(id, {isActive: true}, {new: true})
     .then(
        user => {
            if (user && user.username) {
              res.send(user);
            } else {
              res.status(404).send({error: "User not found"});
            }
        },
        error => {
            res.status(500).send(); // server error
        }
    );

});

// a GET route to find a user by email
app.get("/api/users/email/:email", (req, res) => {

    const email = req.params.email;

    User.findOne({ email: email }).then(
        user => {
            if (user && user.username) {
              res.send(user);
            } else {
              res.status(404).send({error: "User not found"});
            }
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/** Messages routes **/

// A route to create a messsage
app.post("/api/messages", (req, res) => {

    const message = new Message({
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        messageText: req.body.messageText
    })

    message.save().then(
      result => {
        res.send(result);
      },
      error => {
        log(error.message);
        res.status(400).send({error: error.message}); // 400 for bad request
      }
    );
});

// a GET route to get all messages
app.get("/api/messages", (req, res) => {
    Message.find().then(
        messages => {
            res.send(messages); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a GET route to get all messages for a username
app.get("/api/messages/:username", (req, res) => {
    const username = req.params.username;

    Message.find()
      .or([{from: username}, {to: username}])
      .sort({messageDate: 'desc'})
      .then(
        messages => {
            res.send(messages); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/** Routes for sending emails to users **/
// A route to create a messsage
app.post("/api/email", (req, res) => {

    const email = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: "<b>" + req.body.text + "</b>"
    };

    sendEmail(email)
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send();
    });

});

/** Domain data routes **/
// NOTE: We will add these to the DB manually since I don't think just anyone
//  should be able to add this stuff.

// Get a list of available courses
app.get("/api/domain/course", (req, res) => {
    Course.find().then(
        courses => {
            res.send(courses)
        }, error => {
            res.status(500).send()
        }
    )
})

// Get a list of available intersts/skills
app.get("/api/domain/topic", (req, res) => {
    Topic.find().then(
        topics => {
            res.send(topics)
        }, error => {
            res.status(500).send()
        }
    )
})

// Get a list of available difficulties
app.get("/api/domain/difficulties",  (req, res) => {
    res.send(difficulties)
})

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
