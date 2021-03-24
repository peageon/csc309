/**
 * Actions in this file retrieve or modify domain data (eg available UofT courses)
 */

/**
 * Return a list of skills a project might require or a user might have.
 */
export const getAvailableSkills = () => {
    // server call
    return ['CSS', 'HTML', 'React', 'JavaScript', 'Python', 'Tensor Flow'];
}

/**
 * Returns a list of CS-related interests that a user might have.
 */
export const getAvailableInterests = () => {
    // server call
    return ['front-end dev', 'web dev', 'AI', 'ML'];
}

/**
 * Return a list of UofT courses of interest to CS students.
 */
export const getAvailableCourses = () => {
    // server call
    return ['CSC148', 'CSC207', 'CSC209', 'CSC263', 'CSC309', 'CSC343'];
}

/**
 * Return a list of possible project difficulties.
 */
export const getAvailableDifficulties = () => {
    // server call
    return ['Beginner', 'Intermediate', 'Advanced'];
}