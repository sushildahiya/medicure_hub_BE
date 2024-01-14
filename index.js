const express = require('express')
const cors = require('cors');
const app=express()
const port=8000;
const db = require('./config/mongooseConfig');


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());


app.use('/',require('./routes/index'))
app.listen(port,()=>{
    console.log("Server running on port 8000.")
})