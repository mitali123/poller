require('dotenv').config();

module.exports =
{
HOST: process.env.host,
USER: process.env.user,
PASSWORD: process.env.password,
DB: process.env.db,
dialect: "mysql",   
ssl: true
}
