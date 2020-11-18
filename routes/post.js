//import
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const conn = require('../db-connect')
const authMiddleware = require('../middleware/bearer_token')
const jwt = require('jsonwebtoken')

// parse application/json
router.use(bodyParser.json());
router.use(authMiddleware.authenticateToken)

//fungsi utk mengambil id dari user yg sedang login
function insertBy (authHeader){
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.decode(token)
  const id = decoded['id']
  return id
}

//fungsi utk mengambil current time
function insertAt (){
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
    return formatted_date
}

//show all post
router.get('/', (req, res) => {
  const sql = "SELECT * FROM posts";
  const query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ "status": 200, "error": null, "response": results });
  });
});

//show post by id
router.get('/:id', (req, res) => {
  const sql = "SELECT * FROM posts WHERE id=" + req.params.id;
  const query = conn.query(sql, (err, results) => {
    if (err) throw err; 
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});


//create new post
router.post('/', (req, res) => {
    const data = {title: req.body.title, content: req.body.content, insert_by: insertBy(req.headers.authorization), insert_at: insertAt()};
    const sql = "INSERT INTO posts SET ?";
    const query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//update post
router.put('/:id', (req, res) => {
  const sql = "UPDATE posts SET title='" + req.body.title + "', content='" + req.body.content + "',insert_by='" + insertBy() + "',insert_at='" + insertAt() + "' WHERE id=" + req.params.id;
  const query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});

//delete post by id
router.delete('/:id', (req, res) => {
  let sql = "DELETE FROM posts WHERE id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});


module.exports = router;