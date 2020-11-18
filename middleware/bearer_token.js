const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

// Load dotenv config
dotenv.config()

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({ "status": 401, "error": "Unauthorized" })

    jwt.verify(token, process.env.access_token_secret, (err, user) => {
        if (err) return res.status(403).json({ "status": 403, "error": "Token is Expired or Wrong token" })

        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
    // console.log(token)

}

module.exports = { authenticateToken }