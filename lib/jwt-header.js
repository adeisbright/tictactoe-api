const tokenHeader = {
    header : {
        algorithm : "HS256" , 
        expiresIn : "480000000" ,
        issuer : "cashup" , 
        subject : "Authorization" 
    }
} 
module.exports = tokenHeader