const jwt = require('jsonwebtoken')
const authConfig = require('./../config/auth.json')

module.exports = (req, resp, next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader)
        resp.status(401).send({error: 'no token provided'})
    const parts = authHeader.split(' ')
    if(parts.length != 2)
        resp.status(401).send({error: 'token error'})
    const [scheme, token] = parts
    if(!/Bearer/i.test(scheme))
        resp.status(401).send({error: 'token malformated'})
    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err)
            resp.status(401).send({error: 'token invalid'})
        req.userId = decoded.id
        return next()
    })

}