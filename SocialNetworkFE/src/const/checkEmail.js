export const isValidEmail = (email) => {
    // Regular expression to check email formatting
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}