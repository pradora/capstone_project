const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;
const tokenRegex = /^eyJ[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/i
const idRegex = /^[0-9]{13}$/
module.exports = {
    emailRegex,
    passwordRegex,
    usernameRegex,
    idRegex,
    tokenRegex,
};