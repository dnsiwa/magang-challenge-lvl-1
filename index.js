const express = require('express')
const dotenv = require('dotenv')

// load dotenv config
dotenv.config()

const app = express()
const port = process.env.app_port || 3000

//import file routes
const routerUser = require('./routes/user')
const routerAuth = require('./routes/auth')
const routerPost = require('./routes/post')

//load routes
app.use('/login', routerAuth)
app.use('/user', routerUser)
app.use('/post', routerPost)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
