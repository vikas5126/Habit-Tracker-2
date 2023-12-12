// including the library
const mongoose = require('mongoose');

// connect to the database 
mongoose.connect('mongodb://127.0.0.1:27017/habit');

// accquire the connection (if it is successful) 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connect with database'));

db.once('open', function(){
    console.log('the connection is successful');
})

module.exports = db;