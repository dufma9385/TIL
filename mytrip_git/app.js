const contactRouter = require('./routes/contact');
//const loginRouter = require('./routes/login');

const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret : '미녀강사 전은수',
    cookie:{
        httpOnly:true,
        secure:false
    }
}));


app.use('/contact',contactRouter);


app.listen(3000, ()=>{
    console.log("server ready");
});