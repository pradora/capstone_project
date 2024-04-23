const usersDB = {
    users: require('../db/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');



const handleLogout = async(req, res) => {
    // on client, also delete the accessToken
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)//Sucessful, No content
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    // is refreshToken in db?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser)  {
        res.clearCookie('jwt', {httpOnly: true})
        return res.sendStatus(204) // Sucessful, No content
    }
   

    // delete refreshToken in db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = {...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser])

    await fsPromises.writeFile(
        path.join(__dirname, "..", "db", "users.json"),
        JSON.stringify(usersDB.users)
    );
    res.clearCookie ('jwt', {httpOnly:true, sameSite: 'None', secure:true}) 
    res.sendStatus(204) // Sucessful, No content
    console.log("logout successful")

}

module.exports = { handleLogout }