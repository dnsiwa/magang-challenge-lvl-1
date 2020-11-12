//import
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const conn = require('../db-connect')
const authMiddleware = require('../middleware/bearer_token')

// parse application/json
router.use(bodyParser.json());
router.use(authMiddleware.authenticateToken)

//show list user
router.get('/', (req, res) => {
  const sql = "SELECT * FROM users";
  const query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ "status": 200, "error": null, "response": results });
  });
});

//show list user with id
router.get('/:id', (req, res) => {
  const sql = "SELECT * FROM users WHERE id=" + req.params.id;
  const query = conn.query(sql, (err, results) => {
    if (err) throw err; 
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    console.log(req.params.id)
  });
});


//create new user
router.post('/', (req, res) => {
  const plainPassword = req.body.password
  bcrypt.hash(plainPassword, 10, function (err, hash) {
    console.log(hash)
    if (err) throw err;

    const data = {
      id: req.body.id,
      fullname: req.body.fullname,
      username: req.body.username,
      password: hash
    };
    const sql = "INSERT INTO users SET ?";
    const query = conn.query(sql, data, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
      console.log(req.body.fullname)
    });
  });
});

//update user
router.put('/:id', (req, res) => {
  const sql = "UPDATE users SET fullname='" + req.body.fullname + "', username='" + req.body.username + "',password='" + req.body.password + "' WHERE id=" + req.params.id;
  const query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    console.log(req.body.fullname)
  });
});

//Delete data product berdasarkan id
router.delete('/:id', (req, res) => {
  let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});


module.exports = router;