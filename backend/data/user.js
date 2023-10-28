import bcrypt from 'bcryptjs';

const user = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Monisha Ch',
        email: 'monisha@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'Aryan Ch',
        email: 'aryan@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
]

export default user;