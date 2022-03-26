const express = require('express')
const app = express()
const questions = require('./db')
const { Client } = require('pg')
//Cross-origin resource sharing (CORS)
const cors = require('cors')
//cors enabled for localhost:3000
/*let corsOptions ={
    origin:['http://localhost:3000']
}*/
//required to use python script
const { spawn } = require('child_process');
const { question1 } = require('./db')

//CORS enabled for all origins
app.use(cors());
app.use(express.json());//used to parse json bodies
app.use(express.urlencoded({ extended: false }));//used to parse URL-encoded bodies
//sends jsons to the frontend
app.get('/api', (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
});
/*app.get('/home', (req, res) => {
    res.json({ "string": "Hello World", "number": "one" })
});*/
// get data from db.js
app.get('/questions', (req, res) => {
    res.json(questions)
});
//get question1 from db
app.get('/questions/question1', (req, res) => {
    res.json(questions.question1)
});
//get question2 from db
app.get('/questions/question2', (req, res) => {
    res.json(questions.question2)
});
//get question3 from db
app.get('/questions/question3', (req, res) => {
    res.json(questions.question3)
});
//cors as middleware

app.post('/data',/*cors(corsOptions),*/(req, res) => {
    console.log(req.body);
    let answers = req.body;

    const python = spawn('python', ['algorithm.py', answers[0], answers[1], answers[2]]);

    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        console.log(dataToSend);
        res.json({ dataToSend });
    });
})
/*app.get('/home', (req, res) => {
    const python = spawn('python', ['algorithm.py', answers[0], answers[1], answers[2]]);

    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        console.log(dataToSend);
        res.json({ dataToSend });
    });
    answers=[]
});*/
const client = new Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password:"loki2345",
    database:"postgres"
})
client.connect();
var data;

client.query(`SELECT * FROM users`,(err,res)=>{
    if(!err){
        data=res.rows
    } else{
        console.log(err.message);
    }
    client.end;
})
app.get('/testData', (req, res) => {
    console.log(data)
    res.json(data)
});

app.post('/testDataResponse',(req,res)=>{
var fname = req.body.firstname;
var lname=req.body.lastname;
var location = req.body.location
//res.json({ "firstname":fname,"lastname":lname,"location":location })
//client.connect();
client.query("INSERT INTO users(firstname, lastname, location)VALUES($1, $2, $3)",[fname,lname,location],(err,res)=>{
    client.end;
})
setTimeout(()=>{client.query(`SELECT * FROM users`,(err,res)=>{
    if(!err){
        data=res.rows
    } else{
        console.log(err.message);
    }
    client.end;
})},2000);
setTimeout(()=>{ res.json(data) },3000);
});
app.listen(5000, () => { console.log("Server started on port 5000") })