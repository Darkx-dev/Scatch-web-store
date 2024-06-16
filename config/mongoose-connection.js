const mongoose = require('mongoose')
const dbgr = require("debug")("development:mongoose");

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/scatch')
        dbgr("Connected to db")
    } catch (error) {
        dbgr(error)
    }
}

connect()

module.exports = mongoose.connection