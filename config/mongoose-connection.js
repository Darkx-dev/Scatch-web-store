const mongoose = require('mongoose')
    
mongoose.connect('mongodb://localhost:27017/scatch')

const connect = async () => {
    try {
        await mongoose.connection('mongodb://localhost:27017/scatch')
        console.log('Error creating connection')
    } catch (error) {
        console.log(error)
    }
}

connect()

module.exports = mongoose.connection