const usersDB = {
    users: require('../db/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ 'message': "username and password are required." })
    // check for duplicaaaaate usernames in the db
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); //COnflich
    try {
        // encrypt the password 
        const hashedPassword = await bcrypt.hash(password, 10);
        // store the new user
        const newUser = {
            "username": user,
            "roles": { "User": 2001 },
            "password": hashedPassword
        }
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'db', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users)
        res.status(201).json({ 'success': `new user ${user} created!` })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = { handleNewUser }