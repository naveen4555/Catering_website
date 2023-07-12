const exp = require("constants");
const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");

//middlewares
app.use(express.urlencoded({extended:true}));

//db config
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "catering"
});

//pool creation
db.connect();

//home request
app.get('/home',(req,res) => {
    res.sendFile(path.join(__dirname,'Views','index.html'));
});


//register request
app.get('/register',(req,res) => {
    res.sendFile(path.join(__dirname,'Views','register.html'));  
})

app.post('/register',(req,res) => {
    const {fullname , mobile, password} = req.body;
    // console.log("hi");
    db.query('SELECT userId FROM users ORDER BY userId DESC LIMIT 1' ,(err,results) => {
        if(err) {
            console.log("hello");
            return res.send("Try again");
        }
        else {
            // console.log(results[0].userId);
            const ID = results[0].userId+1;
            db.query('INSERT INTO users (userId,userName,mobileNumber,password) VALUES (?,?,?,?)',[ID,fullname,mobile,password],(err,results) =>{
                if(err) {
                    res.send("Try again");
                } 
                else {
                    res.send("Registration Successful");
                }
            })
        }
    }) 
});

app.listen(8000);