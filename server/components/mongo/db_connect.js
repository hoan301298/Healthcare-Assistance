const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/healthcare-assistance');
    
    const db = mongoose.connection;
    db.on('error', (error) => {
        console.log(error)
    })
    
    db.once('open', () => {
        console.log('Database Connection Established!')
    })
    
}

module.exports = connectDatabase;


