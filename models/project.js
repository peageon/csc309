/* Project mongoose model */
const mongoose = require('mongoose')

const { User } = require('./user')

const difficulties = ['Beginner', 'Intermediate', 'Advanced']

const ProjectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
    },
    poster: {
        type: String, // Username
        required: true,
        validate: {
            validator: (v) => {
                return new Promise((resolve, reject) => {
                    User.find({username: v}, (err, user) => {
                        if (err || !user) {
                            reject(false)
                        } else {
                            resolve(true)
                        }
                    })
                })
            },
            message: 'Given user does not exist.'
          }
    },
	description: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    peopleDescription: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    additional: {
        type: String,
        required: false,
        trim: true
    },
    requiredSkills: {
        type: [String] // TODO: validate this
    },
    requiredCourses: {
        type: [String] // TODO: validate this
    },
    difficulty: {
        type: String,
        required: true,
        enum: difficulties
    },
    flagged: {
        type: Boolean,
        default: false
    }
})

const Project = mongoose.model("Project", ProjectSchema)

module.exports = { Project, difficulties }