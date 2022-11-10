const Mongoose = require('mongoose');
const debug = require('debug')('piharwaDB:db');
const config = require('./config');

Mongoose.Promise = global.Promise;
Mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = Mongoose.connection;

db.on('error', () => {
    debug(`Mongoose Connection error ${config.database.url} \nPlease make sure MongoDB is running`);
    process.exit();
})

db.once('open', () => {
    debug('MongoDB connection with database succeeded.')
});

process.on("SIGINT", () => {
    db.close(() => {
        debug('MongoDB connection disconnected through app termination.');
        process.exit();
    });
});

module.exports = db;