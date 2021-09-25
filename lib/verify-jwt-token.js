const jwt       = require("jsonwebtoken") 
const jwtHeader = require("./jwt-header") 
let { BadRequestError, ApplicationError } = require("./error-handler")
const authenticateRequest = (req , res , next) => {
    try {
        
        if ( typeof req.headers.authorization !== "undefined") {
            let token = req.headers.authorization.split(" ")[1] 
           
            jwt.verify(token ,  process.env.tokenSecret  ,jwtHeader.header,   async(err , data) => {
                if ( err ) {
                    console.log(err)
                    return next(new BadRequestError(err.message))
                }else { 
                    let tokenDetail = await jwt.decode(token) 
                    req.id = tokenDetail.id
                    return next()
                }
            })
        }else {
            return next(new BadRequestError("Missing Authorization Token"))
        } 
    }catch(error){
       return next(new ApplicationError(error))
    }
}

module.exports = authenticateRequest