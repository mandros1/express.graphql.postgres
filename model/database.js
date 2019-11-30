require('dotenv').config()
const pgPromise = require('pg-promise');

const pgPromiseObject = pgPromise({}); // Empty object means no additional config required

const config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PW
};

// console.log(`Host and others are: ${process.env.POSTGRES_HOST} ${process.env.POSTGRES_PORT} ${process.env.POSTGRES_DB} ${process.env.POSTGRES_USER} ${process.env.POSTGRES_PW}`)

const database = pgPromiseObject(config);

// Uncomment the code below and run node database.js to test the POSTGRE connection
// db.any('select * from users')
//     .then(res => {
//         console.log(res);
//     });

exports.db = database;
