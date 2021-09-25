const coordinateParser = (latitude , longitude) => {
    if (Object.is(typeof latitude , "number") && 
        Object.is(typeof longitude , "number")
    ){
        if (Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180){
            return true
        }
        return false
    }
    return false
}

module.exports = coordinateParser