const validateEmail = (val) => {
	const emailPattern = /^[a-zA-Z]+((\d+|_+|\.)?([a-zA-Z]+|\d+)*)+@[a-zA-Z]{3,}\.[a-zA-Z]{2,6}$/
	try { 
		if ( String(val).match(emailPattern)) {
	        return true
		}
        return false 
	}catch(err) {
		return false
	} 
}

module.exports = validateEmail