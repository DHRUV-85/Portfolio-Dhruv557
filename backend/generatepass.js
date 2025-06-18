const bcrypt = require('bcryptjs');

const password = 'Dhruv557$$##'; // Replace with your actual password
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log('Hashed password:', hashedPassword);