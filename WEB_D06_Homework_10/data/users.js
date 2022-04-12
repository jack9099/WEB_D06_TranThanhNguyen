const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Nguyen Tran Admin',
        email: 'nguyentran9099@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: true
    },
    {
        name: 'Nguyen 2',
        email: 'nguyentran29099@gmail.com',
        password: bcrypt.hashSync('1276768', 10),
        isAdmin: false,
    },
    {
        name: 'Nguyen 3',
        email: 'nguyentran39099@gmail.com',
        password: bcrypt.hashSync('12365368', 10),
        isAdmin: false,
    },
    {
        name: 'Nguyen 4',
        email: 'nguyentran49099@gmail.com',
        password: bcrypt.hashSync('1232314', 10),
        isAdmin: false,
    },
    {
        name: 'Nguyen 5',
        email: 'nguyentran59099@gmail.com',
        password: bcrypt.hashSync('1232314', 10),
        isAdmin: false,
    },
]

module.exports = users;