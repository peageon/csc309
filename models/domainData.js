/**
 * Mongoose models for domain data eg skills, available UofT course.
 */

const mongoose = require('mongoose')

const topicCategories = ["Language", "Paradigm", "Domain", "Technology", "Role", "Other"]

const CourseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 12,
        trim: true
    },
    title: {
        type: String,
        required: false,
        trim: true
    }
})

const Course = mongoose.model("Course", CourseSchema)

/** Skills and interests are both topics. */
const TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    category: {
        type: String,
        required: false,
        enum: topicCategories
    }
})

const Topic = mongoose.model("Topic", TopicSchema)

module.exports = { Course, CourseSchema, Topic, TopicSchema }