require('dotenv').config(); // Load ENV variables

dbPassword = process.env.DATABASE_URL;

module.exports = {
    mongoURI: dbPassword
};