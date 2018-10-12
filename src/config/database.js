const mongoose = require('mongoose')
url = 'mongodb://localhost:27017/minicurso'

mongoose.connect(url, {useCreateIndex: true, useNewUrlParser: true})

mongoose.Promise = global.Promise

module.exports = mongoose