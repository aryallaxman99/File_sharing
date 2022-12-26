const express = require('express');
const path = require('path');

const app = express();

const connectDB = require('./config/db');
connectDB();


//view engines
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');


//routes
app.use(express.static('public'));
app.use('/api/file',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));


const port = process.env.port|| 3000; 

app.listen(port,(err)=>{
    if(err){
        console.log(`error occur ${err}`);
    }else{
        console.log(`server run sucesfully on ${port}`);
    }
});

