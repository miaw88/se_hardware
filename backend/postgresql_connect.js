const { Client } = require('pg');

const pgConfig = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'mintod',
    password: '@Sss350340',
    port: 5432,
};

const pgClient = new Client(pgConfig);

const PgConnected = () => {
    pgClient.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));
}

module.exports = { PgConnected, pgClient }
