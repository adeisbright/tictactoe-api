
const validateMobile = require("./validate-mobiles") 
const validateEmail   = require("./validate-email") 
const passwordChecker = require("./password-validator");

const isInputValid = (body) => {
    let {password , phoneNumber , email , confirmPassword} = body 
    
    if (!password && !confirmPassword && !phoneNumber && !email ) {
        return false  
    }
    let isPasswordMatch = password === confirmPassword ? true : false 
    let isMobile = validateMobile(phoneNumber) 
    let isEmail = validateEmail(email) 
    let isStrongPassword = passwordChecker(password).value 
    if (isPasswordMatch && isMobile && isEmail && isStrongPassword) {
        return true 
        
    }
    return false ; 
}

module.exports = isInputValid