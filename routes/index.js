var express = require('express');
var router = express.Router();

sqlite = require('sqlite3').verbose();
db = new sqlite.Database(".\\data.sqlite", sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});



/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  const data = req.query;
  console.log(data);
  // res.json(data);
  res.send("Got it!");
});

router.get('/', function(req, res, next) {
  sql= "SELECT * FROM quote";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});
// router.post('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   const data = req.body;
//   console.log(data);
//   res.json(data);
//   // res.send("Got it!");
// });

module.exports = router;
