const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0/medicure_hub',{  useNewUrlParser: true,
useUnifiedTopology: true })

const db = mongoose.connection
db.on('error',(err)=>{console.log('Error in connecting mongoDB ',err)})
db.once('open',(err)=>{console.log("MongoDB connection established")})

