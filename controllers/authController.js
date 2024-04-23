const usersDB = {
    users: require('../db/users.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ 'message': "username and password are required." })

    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401) // unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        const roles = Object.values(foundUser.roles)
        // create JWT to protect routes
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            }
            ,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '120s' }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        // saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.usernae !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken }
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'db', 'users.json'),
            JSON.stringify(usersDB.users)
        )          // httpOnly not available to JS                                  // 24HRS=   HRS  MIN  SEC   mS
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken })
        console.log("login successful")
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }