const express = require('express')
const app = express()
const questions=require('./db')
const{Client} = require('pg')
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
app.get('/home', (req, res) => {
    res.json({ "string": "Hello World", "number": "one" })
});
// get data from db.js
app.get('/questions',(req,res)=>{
    res.json(questions)
});
//get question1 from db
app.get('/questions/question1',(req,res)=>{
    res.json(questions.question1)
});
//get question2 from db
app.get('/questions/question2',(req,res)=>{
    res.json(questions.question2)
});
//get question3 from db
app.get('/questions/question3',(req,res)=>{
    res.json(questions.question3)
});
//cors as middleware
app.post('/data',/*cors(corsOptions),*/(req, res) => {
    console.log(req.body)
    var num1 = req.body.num1;
    console.log(num1);
    var num2 = req.body.num2;
    console.log(num2);
    //call python script
    const python = spawn('python', ['testscript1.py', num1, num2]);
    python.stdout.on('data', function (data) {
        dataToSend = data.toString().split(',');
        console.log(dataToSend);
        res.json({ "sum": dataToSend });
    });

})

/*const client = new Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password:"loki2345",
    database:"postgres"
})

client.connect();

client.query(`SELECT * FROM users`,(err,res)=>{
    if(!err){
        console.log(res.rows)
    } else{
        console.log(err.message);
    }
    client.end;
})
*/
app.listen(5000, () => { console.log("Server started on port 5000") })