const jwt       = require("jsonwebtoken")
/**
 * 
 * @param {Object} obj Object token needs to be signed against
 * @param {String} secret Secret for verifying token
 * @param {Object} header Object containing information about jwt 
 * @returns {String} token
 */
const signToken = async(obj, secret , header ) => {
    try {
        if (obj.hasOwnProperty("_id")){
            const payload = {
                id : obj._id
            }
            const token = await jwt.sign(payload , secret, header)
            return token
        }
        throw new Error("Could not sign token")
    }catch(error){
        return error
    }
}
module.exports = signToken