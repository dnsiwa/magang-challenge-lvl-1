const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const conn = require('../db-connect')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Load dotenv config
dotenv.config()

// parse application/json
router.use(bodyParser.json());

function generateAccessToken(payload) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign({
        id: payload.id,
        fullname: payload.fullname,
        username: payload.username,
    }, process.env.access_token_secret, { expiresIn: '1800s' })
}


// Login Endpoint
router.post('/', (req, res) => {

    const sql = `SELECT * FROM users WHERE username=?`
    conn.query({ sql, values: [req.body.username] }, (err, results) => {
        
        if (err) throw err

        const user = results[0]

        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) throw err

            if (result === true) {
                const token = generateAccessToken(user);
                res.json({ "status": 200, "error": null, "response": token }) 
                console.log(user)
            } else {
                res.status(401).json({ "status": 401, "error": "Login error" })
            }
        })
    })
})

module.exports = router

