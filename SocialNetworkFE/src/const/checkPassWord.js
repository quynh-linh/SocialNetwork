
// Check the length of the password
const checkLengthPassword = (password) => {
    if (password.length > 8) {
        return true;
    }
    return false;
}
// Check the letters in the password
const checkLettersPassword = (password) => {
    // Test contains at least one uppercase letter and Test contains at least one lowercase letter
    if (!/[A-Z]/.test(password) && !/[a-z]/.test(password)) {
        return false;
    }
    return true;
}
// Check contains at least one number
const checkContainsLeastOneNumber = (password) => {
    if (!/[0-9]/.test(password)) {
        return false;
    }
    return true;
}
// Check contains at least one special character
const checkContainsLeastOneNumberSpecialCharacter = (password) => { 
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return false;
    }
    return true;
}

// Check pass word level height
const checkPasswordHeight = (password) => {
    if(checkLengthPassword(password) && checkLettersPassword(password) && (checkContainsLeastOneNumber(password) || checkContainsLeastOneNumberSpecialCharacter(password))){
        return true;
    } 
    return false;
};

// Check pass word level medium
const checkPasswordMedium = (password) => {
    if((checkLengthPassword(password) && checkLettersPassword(password))){
        return true;
    } 
    return false;
};

// Check pass word level low
const checkPasswordLow = (password) => {
    if(checkLengthPassword(password)){
        return true;
    } 
    return false;
};

export {checkPasswordHeight,checkPasswordLow,checkPasswordMedium}