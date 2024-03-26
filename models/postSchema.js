// 2
const mongoose = require('mongoose')

const postdataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    recipename: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    }
})

// creating model
const posts=mongoose.model('posts',postdataSchema)
module.exports=posts