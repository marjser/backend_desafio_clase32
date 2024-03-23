const EErrors = require("./errors/enum-errors")
const generateUserErrorInfo = require("./errors/generate-user-error-info")

class CustomError {
    static createError({name = 'Error', cause, message, code}) {
        const error = new Error(message)
        error.cause = cause
        error.name = name
        error.code = code
        throw error
    }
}


module.exports = CustomError


