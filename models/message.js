/* Message model */
const mongoose = require('mongoose')

const validator = require('validator')

const { User } = require('./user')

const MessageSchema = new mongoose.Schema({
  from : {
    type: String,
		required: true,
		minlength: 4,
		trim: true,
    validate: {
        validator: (v) => {
            return new Promise((resolve, reject) => {
                User.findOne({ username: v }).then((user) => {
                    if (user) {
                      resolve(true)
                    } else {
                      resolve(false)
                    }
                })
            })
        },
        message: 'User does not exist'
      }
  },
  to : {
    type: String,
		required: true,
		minlength: 4,
		trim: true,
    validate: {
        validator: (v) => {
            return new Promise((resolve, reject) => {
                User.findOne({ username: v }).then((user) => {
                    if (user) {
                      resolve(true)
                    } else {
                      resolve(false)
                    }
                })
            })
        },
        message: 'User does not exist'
      }
  },
  subject : {
    type: String,
		required: true,
		minlength: 1,
		trim: true
  },
  messageText : {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  messageDate : {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Message = mongoose.model('Message', MessageSchema)

module.exports = { Message }
