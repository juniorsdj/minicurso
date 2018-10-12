const express = require('express')
const bodyParser = require('body-parser')

const port = 3001

const app = express()
const api = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// api.use(bodyParser.urlencoded({extended: false}))
// api.use(bodyParser.json())

require('./controller/authController')(app)
require('./controller/projectController')(app)
api.use('/api', app)


api.listen(port,() =>{
    console.log('backend is running ', port)
})