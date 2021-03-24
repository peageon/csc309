/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { sendSignUpEmail } = require("../common/email");

const UserSchema = new mongoose.Schema({
  username : {
    type: String,
		required: true,
		minlength: 4,
		trim: true,
		unique: true
  },
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not a valid email address'
		}
	},
  password: {
		type: String,
		required: true,
		minlength: 4 // we need to be able to have user w/ username and password "user"
	},
  firstName: {
      type: String,
      required: false,
      trim: true
  },
  lastName: {
      type: String,
      required: false,
      trim: true
  },
  year: {
      type: Number,
      required: false
  },
  skills: {
      type: [String] // TODO: validate this
  },
  pey: {
      type: Boolean,
      required: false
  },
  isActive: {
      type: Boolean,
      required: false
  },
  aboutMe: {
    type: String,
    required: false,
	trim: true
  },
  courses: {
	  type: [String]
  }
});

// Function to hash the password
UserSchema.pre('save', function(next) {
	const user = this;

	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(1, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
});

// Function to send an email to a newly created user
UserSchema.post('save', function(next) {
	const user = this;

	if (!user.isActive) {
    sendSignUpEmail(user);
	}
});

UserSchema.statics.findUser = function(username, password) {
	const User = this;

  return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject(new Error("Invalid user"))
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
          if (user.isActive) {
            resolve(user)
          } else {
            reject(new Error("User is inactive"))
          }
				} else {
					reject(new Error("Invalid password"))
				}
			})
		})
	})
};

UserSchema.statics.findUserByEmail = function(email, password) {
	const User = this;

  return User.findOne({ email: email }).then((user) => {
		if (!user) {
			return Promise.reject(new Error("Invalid user"))
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
          if (user.isActive) {
            resolve(user)
          } else {
            reject(new Error("User is inactive"))
          }
				} else {
					reject(new Error("Invalid password"))
				}
			})
		})
	})
};

const User = mongoose.model('User', UserSchema)

module.exports = { User }
