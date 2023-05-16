var express = require('express');
var router = express.Router();

sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./data.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});


sql = 'CREATE TABLE IF NOT EXISTS price_data (ID INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, price TEXT)'
db.run(sql);

router.post('/', (req, res) => {
    const {date, name, price}=req.body;
    sql = "INSERT INTO price_data (date, price) VALUES (?, ?)";
    db.run(sql, [date, price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    // return res.status(200).send('inserted');
    res.redirect('/html/data.html');
})


router.get('/', function(req, res, next) {
    sql= "SELECT * FROM price_data";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

module.exports = router;
