const EErrors = require("../../handlers/errors/enum-errors")
const TYPE_ERRORS = require("../../handlers/errors/types-errors")

const errorMiddleware = (error, req, res, next) => {
    console.log(error)    
    console.error(error.cause)


    switch (error.code) {
        case EErrors.BAD_REQUEST:
            res.status(EErrors.BAD_REQUEST).json({status: error.code, message: error.cause})
            break;

        case EErrors.FORBIDDEN:
            res.status(EErrors.FORBIDDEN).json({status: error.code, message: error.cause})
            break;
                
        case EErrors.BAD_GATEWAY:
            res.status(EErrors.BAD_GATEWAY).json({status: error.code, message: error.cause})
            break;

        case EErrors.NOT_FOUND:
            res.status(EErrors.NOT_FOUND).json({status: error.code, message: error.cause})
            break;

        case EErrors.UNAUTHORIZED:
            res.status(EErrors.UNAUTHORIZED).json({status: error.code, message: error.cause})
            break;

        default:
            res.status(EErrors.INTERNAL_SERVER_ERROR).json({status: error.code, message: error.cause})
    }
}

module.exports = errorMiddleware