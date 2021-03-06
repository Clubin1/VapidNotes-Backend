const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    // Convert empty fields to empty string
    data.fname = ! isEmpty(data.fname) ? data.fname : ''
    data.lname = ! isEmpty(data.lname) ? data.lname : ''
    data.email = ! isEmpty(data.email) ? data.email : ''
    data.password = ! isEmpty(data.password) ? data.password : ''
    data.password2 = ! isEmpty(data.password2) ? data.password2 : ''

    // Name check
    if (Validator.isEmpty(data.fname)) {
        errors.fname = 'First name field is required'
    }
    // Name check
    if (Validator.isEmpty(data.lname)) {
        errors.lname = 'Last name field is required'
    }

    // Email check
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    } else if (! Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    // Password Checks
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required'
    }

    if (! Validator.isLength(data.password, {
        min: 6,
        max: 30
    })) {
        errors.password = 'Password must be at least 6 characters'
    }

    if (! Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match'
    }

    return {errors, isValid: isEmpty(errors)}
}