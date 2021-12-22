const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//koneksi db
const db = mysql.createConnection({
    host : 'localhost' , 
    user: 'root' ,
    password: '' ,
    database: 'media_social'
});

//menjalankan db table post
//create
app.post('/post', (req, res) => {
    let sql = "INSERT INTO posts SET post_date=NOW()"
            +", username= '"+req.body.username
            +"', post= '"+req.body.post+"'";
    
    db.query(sql,(err,result) => {
        if(err) throw err;
        res.json({ "status" : 200 ,
                  "message" : "Berhasil" ,
                  "data" : null });
    });
});

//retriave
app.get('/post', (req, res) => {
    let sql = "SELECT post_id, username, post, DATE FORMAT(post_date, '%W %D XM %Y %H:%i') as post_date FROM posts";
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data diambil",
                  "data":results});
    });
});
//update
//delete

app.use('/images',express.static('images'));

app.listen(port,() => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});