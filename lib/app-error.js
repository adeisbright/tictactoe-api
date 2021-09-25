"use strict" 
class ApplicationError extends Error {
    get name(){
        return this.constructor.name ; 
    }
    get statusCode() {
        return 500 ; 
    }
}

class DbError extends ApplicationError {
    constructor(message){
        super(message) ; 
    } 
    get statusCode() {
        return 500 ; 
    }
} 
class BadRequestError extends ApplicationError {
    constructor(message , options = {}){
        super(message) ; 
        for (const [key , value] of Object.entries(options)){
            this[key] = value ; 
        }
    }

    get statusCode(){
        return 400 ;
    }
}

class NotFoundError extends ApplicationError {
    constructor(message , options = {}){
        super(message) ; 
        for (const [key , value] of Object.entries(options)){
            this[key] = value ; 
        }
    }

    get statusCode(){
        return 404 ;
    }
}

class NotAuthorizeError extends ApplicationError {
    constructor(message , options = {}){
        super(message) ; 
        for (const [key , value] of Object.entries(options)){
            this[key] = value ; 
        }
    }

    get statusCode(){
        return 401 ;
    }
}

class ForbiddenError extends ApplicationError {
    constructor(message , options = {}){
        super(message) ; 
        for (const [key , value] of Object.entries(options)){
            this[key] = value ; 
        }
    }

    get statusCode(){
        return 403 ;
    }
}

module.exports = {
    ApplicationError , 
    BadRequestError , 
    NotAuthorizeError , 
    NotFoundError , 
    DbError , 
    ForbiddenError
}