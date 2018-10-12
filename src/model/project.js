const mongoose = require('./../config/database')
const bcrypt = require('bcryptjs')

const projectSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        lowercase: true
    },
    description:{
        type: String,
        required: true,
        unique: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        
    },
    
    createdAt:{
        type: Date,
        default: Date.now
    }
})


const Project = mongoose.model('project', projectSchema)
module.exports = Project