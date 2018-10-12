const mongoose = require('./../config/database')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true
    },
    login:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const User = mongoose.model('user', userSchema)
module.exports = User