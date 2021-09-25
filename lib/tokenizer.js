const tokenHeader = {
    secret :  process.env.tokenSecret ,
    header : {
        algorithm : "HS256" , 
        expiresIn : "600000000" ,
        issuer : "eventals" , 
        subject : "Authorization" 
    }
} 
module.exports = tokenHeader